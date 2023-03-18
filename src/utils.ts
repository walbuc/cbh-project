import crypto from 'crypto'
import * as R from 'ramda'

const createHash = (data: string, alg = 'sha3-512') =>
  crypto.createHash(alg).update(data).digest('hex')

const stringifyAndHash: (a: any) => string = R.pipe(JSON.stringify, createHash)

export {stringifyAndHash, createHash}
