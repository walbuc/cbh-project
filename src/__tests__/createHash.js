import crypto from 'crypto'
import {createHash} from '../utils'
import {deterministicPartitionKey, MAX_PARTITION_KEY_LENGTH} from '../dpk'

jest.mock('../utils')

describe('createHash: utility used with deterministicPartitionKey', () => {
  test('is called one time with partition key when is string and greater than MAX LENGTH', () => {
    const event = {
      partitionKey: crypto
        .randomBytes(MAX_PARTITION_KEY_LENGTH)
        .toString('hex'),
    }
    const {partitionKey} = event
    deterministicPartitionKey(partitionKey)
    expect(createHash).toHaveBeenCalledTimes(1)
    expect(createHash).toHaveBeenCalledWith(event.partitionKey)
  })

  test('is not called when partition key string and length less than MAX length', () => {
    const event = {
      partitionKey: 'some key value',
    }
    const {partitionKey} = event
    deterministicPartitionKey(partitionKey)
    expect(createHash).not.toHaveBeenCalled()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
