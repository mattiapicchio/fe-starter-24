/*  
Util function to improve error handling in JS, specifically the try/catch block, addressing the following limitations:
In try/catch blocks none of the errors are typed, it adds an extra level of block scoping which can make certain code difficult to write, and it catches all errors (not just the ones you want). 

Usage:
const [error, data] =  await catchError(fn);
*/

export function catchError<T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T]
    })
    .catch((error) => {
      return [error]
    })
}

/* 
catchError with custom defined errors and errors type safety 
(to only catch custom defined errors of the specific type) 
*/
export function catchErrorTyped<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T]
    })
    .catch((error) => {
      if (errorsToCatch == undefined) {
        return [error]
      }

      if (errorsToCatch.some((err) => error instanceof err)) {
        return [error]
      }

      throw error
    })
}
