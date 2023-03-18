import cases from 'jest-in-case'
import {
  deterministicPartitionKey,
  TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH,
} from '../dpk'
import * as utils from '../utils'
import crypto from 'crypto'

function casify(obj) {
  return Object.entries(obj).map(([name, value]) => ({
    name: `${
      typeof value == 'object' ? JSON.stringify(value, null, 4) : value
    } - ${name}`,
    value,
  }))
}

cases(
  'deterministicPartitionKey: expected default value',
  ({value}) => {
    expect(deterministicPartitionKey(value)).toBe(TRIVIAL_PARTITION_KEY)
  },
  casify({['Undefiend value']: undefined, ['Null value']: null}),
)

cases(
  'deterministicPartitionKey: expected to hash Event object without partition key.',
  ({value}) => {
    expect(deterministicPartitionKey(value)).toBe(utils.stringifyAndHash(value))
  },
  casify({
    'empty object': {},
    'object with some porperties': {name: 'Event name'},
  }),
)

cases(
  'deterministicPartitionKey: expected to return PartitionKey property from Event object.',
  ({value}) => {
    const {partitionKey} = value
    expect(deterministicPartitionKey(value)).toBe(partitionKey)
  },
  casify({
    'Event with Partition Key': {partitionKey: 'some value'},
    'Event with Partition Key and extra properties': {
      partitionKey: 'value',
      name: ' Event name',
      foo: 'bar',
    },
  }),
)

cases(
  'deterministicPartitionKey: expected to return stringified not string type properties.',
  ({value}) => {
    const {partitionKey} = value
    expect(deterministicPartitionKey(value)).toBe(JSON.stringify(partitionKey))
  },
  casify({
    'Event with numeric Partition Key': {partitionKey: 100},
    'Event with float Partition Key': {
      partitionKey: 50.005,
    },
    'Event with object Partition Key': {
      partitionKey: {deep: 'partition key name '},
    },
  }),
)

cases(
  'deterministicPartitionKey: expected to create hash when partition key length is greater than MAX_PARTITION_KEY_LENGTH.',
  ({value}) => {
    const {partitionKey} = value
    const r = utils.createHash(partitionKey)

    expect(deterministicPartitionKey(value)).toBe(r)
  },
  casify({
    'Event with random Partition Key greater than MAX_PARTITION_KEY_LENGTH': {
      partitionKey: crypto
        .randomBytes(MAX_PARTITION_KEY_LENGTH)
        .toString('hex'),
    },
    'Event with random 1 Partition Key greater than MAX_PARTITION_KEY_LENGTH': {
      partitionKey: crypto
        .randomBytes(MAX_PARTITION_KEY_LENGTH)
        .toString('hex'),
    },
    'Event with random 2 Partition Key greater than MAX_PARTITION_KEY_LENGTH': {
      partitionKey: crypto
        .randomBytes(MAX_PARTITION_KEY_LENGTH)
        .toString('hex'),
    },
  }),
)
