import * as R from 'ramda'
import {stringifyAndHash, createHash} from './utils'
// in a real world we would have more properties for this interface
interface Event {
  partitionKey?: any
}
const TRIVIAL_PARTITION_KEY = '0'
const MAX_PARTITION_KEY_LENGTH = 256

const hasPartitionKey = R.has('partitionKey')

const isNotString = R.compose(R.not, R.is(String))

const getCandidate = R.ifElse(hasPartitionKey, R.prop('partitionKey'), x =>
  stringifyAndHash(x),
)

const getCandidateKeyIfEvent = R.when(R.is(Object), getCandidate)

const updateCandidateKeyIfMaxlength = R.when(
  R.propSatisfies(R.gt(R.__, MAX_PARTITION_KEY_LENGTH), 'length'),
  createHash,
)

const getEventOrDefaultValue = (e?: Event) => e ?? TRIVIAL_PARTITION_KEY

const updateCandidateIfNotString = R.when(isNotString, JSON.stringify)

// THIS IS THE FUNCTION TO BE TESTED
// You can see which are the composable steps necessaries to get the string result.
const deterministicPartitionKey: (event?: Event) => string = R.pipe(
  getEventOrDefaultValue,
  getCandidateKeyIfEvent,
  updateCandidateIfNotString,
  updateCandidateKeyIfMaxlength,
)

export {
  deterministicPartitionKey,
  TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH,
}
