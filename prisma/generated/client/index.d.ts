
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model UserSession
 * 
 */
export type UserSession = $Result.DefaultSelection<Prisma.$UserSessionPayload>
/**
 * Model AvailablePlayer
 * 
 */
export type AvailablePlayer = $Result.DefaultSelection<Prisma.$AvailablePlayerPayload>
/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model Boost
 * 
 */
export type Boost = $Result.DefaultSelection<Prisma.$BoostPayload>
/**
 * Model ActiveBoost
 * 
 */
export type ActiveBoost = $Result.DefaultSelection<Prisma.$ActiveBoostPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSession`: Exposes CRUD operations for the **UserSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSessions
    * const userSessions = await prisma.userSession.findMany()
    * ```
    */
  get userSession(): Prisma.UserSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.availablePlayer`: Exposes CRUD operations for the **AvailablePlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvailablePlayers
    * const availablePlayers = await prisma.availablePlayer.findMany()
    * ```
    */
  get availablePlayer(): Prisma.AvailablePlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.boost`: Exposes CRUD operations for the **Boost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Boosts
    * const boosts = await prisma.boost.findMany()
    * ```
    */
  get boost(): Prisma.BoostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activeBoost`: Exposes CRUD operations for the **ActiveBoost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActiveBoosts
    * const activeBoosts = await prisma.activeBoost.findMany()
    * ```
    */
  get activeBoost(): Prisma.ActiveBoostDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    UserSession: 'UserSession',
    AvailablePlayer: 'AvailablePlayer',
    Player: 'Player',
    Boost: 'Boost',
    ActiveBoost: 'ActiveBoost'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "userSession" | "availablePlayer" | "player" | "boost" | "activeBoost"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      UserSession: {
        payload: Prisma.$UserSessionPayload<ExtArgs>
        fields: Prisma.UserSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findFirst: {
            args: Prisma.UserSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findMany: {
            args: Prisma.UserSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          create: {
            args: Prisma.UserSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          createMany: {
            args: Prisma.UserSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          delete: {
            args: Prisma.UserSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          update: {
            args: Prisma.UserSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          deleteMany: {
            args: Prisma.UserSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          upsert: {
            args: Prisma.UserSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          aggregate: {
            args: Prisma.UserSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSession>
          }
          groupBy: {
            args: Prisma.UserSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSessionCountArgs<ExtArgs>
            result: $Utils.Optional<UserSessionCountAggregateOutputType> | number
          }
        }
      }
      AvailablePlayer: {
        payload: Prisma.$AvailablePlayerPayload<ExtArgs>
        fields: Prisma.AvailablePlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvailablePlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvailablePlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload>
          }
          findFirst: {
            args: Prisma.AvailablePlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvailablePlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload>
          }
          findMany: {
            args: Prisma.AvailablePlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload>[]
          }
          create: {
            args: Prisma.AvailablePlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload>
          }
          createMany: {
            args: Prisma.AvailablePlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvailablePlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload>[]
          }
          delete: {
            args: Prisma.AvailablePlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload>
          }
          update: {
            args: Prisma.AvailablePlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload>
          }
          deleteMany: {
            args: Prisma.AvailablePlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvailablePlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvailablePlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload>[]
          }
          upsert: {
            args: Prisma.AvailablePlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvailablePlayerPayload>
          }
          aggregate: {
            args: Prisma.AvailablePlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvailablePlayer>
          }
          groupBy: {
            args: Prisma.AvailablePlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvailablePlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvailablePlayerCountArgs<ExtArgs>
            result: $Utils.Optional<AvailablePlayerCountAggregateOutputType> | number
          }
        }
      }
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      Boost: {
        payload: Prisma.$BoostPayload<ExtArgs>
        fields: Prisma.BoostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BoostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BoostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload>
          }
          findFirst: {
            args: Prisma.BoostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BoostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload>
          }
          findMany: {
            args: Prisma.BoostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload>[]
          }
          create: {
            args: Prisma.BoostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload>
          }
          createMany: {
            args: Prisma.BoostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BoostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload>[]
          }
          delete: {
            args: Prisma.BoostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload>
          }
          update: {
            args: Prisma.BoostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload>
          }
          deleteMany: {
            args: Prisma.BoostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BoostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BoostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload>[]
          }
          upsert: {
            args: Prisma.BoostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BoostPayload>
          }
          aggregate: {
            args: Prisma.BoostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBoost>
          }
          groupBy: {
            args: Prisma.BoostGroupByArgs<ExtArgs>
            result: $Utils.Optional<BoostGroupByOutputType>[]
          }
          count: {
            args: Prisma.BoostCountArgs<ExtArgs>
            result: $Utils.Optional<BoostCountAggregateOutputType> | number
          }
        }
      }
      ActiveBoost: {
        payload: Prisma.$ActiveBoostPayload<ExtArgs>
        fields: Prisma.ActiveBoostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActiveBoostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActiveBoostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload>
          }
          findFirst: {
            args: Prisma.ActiveBoostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActiveBoostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload>
          }
          findMany: {
            args: Prisma.ActiveBoostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload>[]
          }
          create: {
            args: Prisma.ActiveBoostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload>
          }
          createMany: {
            args: Prisma.ActiveBoostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActiveBoostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload>[]
          }
          delete: {
            args: Prisma.ActiveBoostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload>
          }
          update: {
            args: Prisma.ActiveBoostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload>
          }
          deleteMany: {
            args: Prisma.ActiveBoostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActiveBoostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActiveBoostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload>[]
          }
          upsert: {
            args: Prisma.ActiveBoostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveBoostPayload>
          }
          aggregate: {
            args: Prisma.ActiveBoostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActiveBoost>
          }
          groupBy: {
            args: Prisma.ActiveBoostGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActiveBoostGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActiveBoostCountArgs<ExtArgs>
            result: $Utils.Optional<ActiveBoostCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    userSession?: UserSessionOmit
    availablePlayer?: AvailablePlayerOmit
    player?: PlayerOmit
    boost?: BoostOmit
    activeBoost?: ActiveBoostOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
  }


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    userSessions: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userSessions?: boolean | SessionCountOutputTypeCountUserSessionsArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountUserSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
  }


  /**
   * Count Type UserSessionCountOutputType
   */

  export type UserSessionCountOutputType = {
    players: number
    activeBoosts: number
  }

  export type UserSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | UserSessionCountOutputTypeCountPlayersArgs
    activeBoosts?: boolean | UserSessionCountOutputTypeCountActiveBoostsArgs
  }

  // Custom InputTypes
  /**
   * UserSessionCountOutputType without action
   */
  export type UserSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSessionCountOutputType
     */
    select?: UserSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserSessionCountOutputType without action
   */
  export type UserSessionCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
  }

  /**
   * UserSessionCountOutputType without action
   */
  export type UserSessionCountOutputTypeCountActiveBoostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveBoostWhereInput
  }


  /**
   * Count Type AvailablePlayerCountOutputType
   */

  export type AvailablePlayerCountOutputType = {
    players: number
  }

  export type AvailablePlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | AvailablePlayerCountOutputTypeCountPlayersArgs
  }

  // Custom InputTypes
  /**
   * AvailablePlayerCountOutputType without action
   */
  export type AvailablePlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayerCountOutputType
     */
    select?: AvailablePlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AvailablePlayerCountOutputType without action
   */
  export type AvailablePlayerCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
  }


  /**
   * Count Type PlayerCountOutputType
   */

  export type PlayerCountOutputType = {
    activeBoosts: number
  }

  export type PlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activeBoosts?: boolean | PlayerCountOutputTypeCountActiveBoostsArgs
  }

  // Custom InputTypes
  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerCountOutputType
     */
    select?: PlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountActiveBoostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveBoostWhereInput
  }


  /**
   * Count Type BoostCountOutputType
   */

  export type BoostCountOutputType = {
    activeBoosts: number
  }

  export type BoostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activeBoosts?: boolean | BoostCountOutputTypeCountActiveBoostsArgs
  }

  // Custom InputTypes
  /**
   * BoostCountOutputType without action
   */
  export type BoostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoostCountOutputType
     */
    select?: BoostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BoostCountOutputType without action
   */
  export type BoostCountOutputTypeCountActiveBoostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveBoostWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$UserSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    cursor?: UserSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    name: string | null
    sessionCode: string | null
    startTime: Date | null
    endTime: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    sessionCode: string | null
    startTime: Date | null
    endTime: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    name: number
    sessionCode: number
    startTime: number
    endTime: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    name?: true
    sessionCode?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    name?: true
    sessionCode?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    name?: true
    sessionCode?: true
    startTime?: true
    endTime?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    name: string
    sessionCode: string
    startTime: Date
    endTime: Date | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sessionCode?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userSessions?: boolean | Session$userSessionsArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sessionCode?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sessionCode?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    name?: boolean
    sessionCode?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "sessionCode" | "startTime" | "endTime" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userSessions?: boolean | Session$userSessionsArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      userSessions: Prisma.$UserSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      sessionCode: string
      startTime: Date
      endTime: Date | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userSessions<T extends Session$userSessionsArgs<ExtArgs> = {}>(args?: Subset<T, Session$userSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly name: FieldRef<"Session", 'String'>
    readonly sessionCode: FieldRef<"Session", 'String'>
    readonly startTime: FieldRef<"Session", 'DateTime'>
    readonly endTime: FieldRef<"Session", 'DateTime'>
    readonly status: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.userSessions
   */
  export type Session$userSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    cursor?: UserSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model UserSession
   */

  export type AggregateUserSession = {
    _count: UserSessionCountAggregateOutputType | null
    _avg: UserSessionAvgAggregateOutputType | null
    _sum: UserSessionSumAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  export type UserSessionAvgAggregateOutputType = {
    xp: number | null
    money: number | null
  }

  export type UserSessionSumAggregateOutputType = {
    xp: number | null
    money: number | null
  }

  export type UserSessionMinAggregateOutputType = {
    id: string | null
    xp: number | null
    money: number | null
    joinedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    sessionId: string | null
  }

  export type UserSessionMaxAggregateOutputType = {
    id: string | null
    xp: number | null
    money: number | null
    joinedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    sessionId: string | null
  }

  export type UserSessionCountAggregateOutputType = {
    id: number
    xp: number
    money: number
    joinedAt: number
    createdAt: number
    updatedAt: number
    userId: number
    sessionId: number
    _all: number
  }


  export type UserSessionAvgAggregateInputType = {
    xp?: true
    money?: true
  }

  export type UserSessionSumAggregateInputType = {
    xp?: true
    money?: true
  }

  export type UserSessionMinAggregateInputType = {
    id?: true
    xp?: true
    money?: true
    joinedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    sessionId?: true
  }

  export type UserSessionMaxAggregateInputType = {
    id?: true
    xp?: true
    money?: true
    joinedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    sessionId?: true
  }

  export type UserSessionCountAggregateInputType = {
    id?: true
    xp?: true
    money?: true
    joinedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    sessionId?: true
    _all?: true
  }

  export type UserSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSession to aggregate.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSessions
    **/
    _count?: true | UserSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSessionMaxAggregateInputType
  }

  export type GetUserSessionAggregateType<T extends UserSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSession[P]>
      : GetScalarType<T[P], AggregateUserSession[P]>
  }




  export type UserSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithAggregationInput | UserSessionOrderByWithAggregationInput[]
    by: UserSessionScalarFieldEnum[] | UserSessionScalarFieldEnum
    having?: UserSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSessionCountAggregateInputType | true
    _avg?: UserSessionAvgAggregateInputType
    _sum?: UserSessionSumAggregateInputType
    _min?: UserSessionMinAggregateInputType
    _max?: UserSessionMaxAggregateInputType
  }

  export type UserSessionGroupByOutputType = {
    id: string
    xp: number
    money: number
    joinedAt: Date
    createdAt: Date
    updatedAt: Date
    userId: string
    sessionId: string
    _count: UserSessionCountAggregateOutputType | null
    _avg: UserSessionAvgAggregateOutputType | null
    _sum: UserSessionSumAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  type GetUserSessionGroupByPayload<T extends UserSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
            : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
        }
      >
    >


  export type UserSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    xp?: boolean
    money?: boolean
    joinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    sessionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    session?: boolean | SessionDefaultArgs<ExtArgs>
    players?: boolean | UserSession$playersArgs<ExtArgs>
    activeBoosts?: boolean | UserSession$activeBoostsArgs<ExtArgs>
    _count?: boolean | UserSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    xp?: boolean
    money?: boolean
    joinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    sessionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    xp?: boolean
    money?: boolean
    joinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    sessionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectScalar = {
    id?: boolean
    xp?: boolean
    money?: boolean
    joinedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    sessionId?: boolean
  }

  export type UserSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "xp" | "money" | "joinedAt" | "createdAt" | "updatedAt" | "userId" | "sessionId", ExtArgs["result"]["userSession"]>
  export type UserSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    session?: boolean | SessionDefaultArgs<ExtArgs>
    players?: boolean | UserSession$playersArgs<ExtArgs>
    activeBoosts?: boolean | UserSession$activeBoostsArgs<ExtArgs>
    _count?: boolean | UserSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type UserSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $UserSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      session: Prisma.$SessionPayload<ExtArgs>
      players: Prisma.$PlayerPayload<ExtArgs>[]
      activeBoosts: Prisma.$ActiveBoostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      xp: number
      money: number
      joinedAt: Date
      createdAt: Date
      updatedAt: Date
      userId: string
      sessionId: string
    }, ExtArgs["result"]["userSession"]>
    composites: {}
  }

  type UserSessionGetPayload<S extends boolean | null | undefined | UserSessionDefaultArgs> = $Result.GetResult<Prisma.$UserSessionPayload, S>

  type UserSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSessionCountAggregateInputType | true
    }

  export interface UserSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSession'], meta: { name: 'UserSession' } }
    /**
     * Find zero or one UserSession that matches the filter.
     * @param {UserSessionFindUniqueArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSessionFindUniqueArgs>(args: SelectSubset<T, UserSessionFindUniqueArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSessionFindUniqueOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSessionFindFirstArgs>(args?: SelectSubset<T, UserSessionFindFirstArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSessions
     * const userSessions = await prisma.userSession.findMany()
     * 
     * // Get first 10 UserSessions
     * const userSessions = await prisma.userSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSessionWithIdOnly = await prisma.userSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSessionFindManyArgs>(args?: SelectSubset<T, UserSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSession.
     * @param {UserSessionCreateArgs} args - Arguments to create a UserSession.
     * @example
     * // Create one UserSession
     * const UserSession = await prisma.userSession.create({
     *   data: {
     *     // ... data to create a UserSession
     *   }
     * })
     * 
     */
    create<T extends UserSessionCreateArgs>(args: SelectSubset<T, UserSessionCreateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSessions.
     * @param {UserSessionCreateManyArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSessionCreateManyArgs>(args?: SelectSubset<T, UserSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSessions and returns the data saved in the database.
     * @param {UserSessionCreateManyAndReturnArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSession.
     * @param {UserSessionDeleteArgs} args - Arguments to delete one UserSession.
     * @example
     * // Delete one UserSession
     * const UserSession = await prisma.userSession.delete({
     *   where: {
     *     // ... filter to delete one UserSession
     *   }
     * })
     * 
     */
    delete<T extends UserSessionDeleteArgs>(args: SelectSubset<T, UserSessionDeleteArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSession.
     * @param {UserSessionUpdateArgs} args - Arguments to update one UserSession.
     * @example
     * // Update one UserSession
     * const userSession = await prisma.userSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSessionUpdateArgs>(args: SelectSubset<T, UserSessionUpdateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSessions.
     * @param {UserSessionDeleteManyArgs} args - Arguments to filter UserSessions to delete.
     * @example
     * // Delete a few UserSessions
     * const { count } = await prisma.userSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSessionDeleteManyArgs>(args?: SelectSubset<T, UserSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSessionUpdateManyArgs>(args: SelectSubset<T, UserSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions and returns the data updated in the database.
     * @param {UserSessionUpdateManyAndReturnArgs} args - Arguments to update many UserSessions.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSession.
     * @param {UserSessionUpsertArgs} args - Arguments to update or create a UserSession.
     * @example
     * // Update or create a UserSession
     * const userSession = await prisma.userSession.upsert({
     *   create: {
     *     // ... data to create a UserSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSession we want to update
     *   }
     * })
     */
    upsert<T extends UserSessionUpsertArgs>(args: SelectSubset<T, UserSessionUpsertArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionCountArgs} args - Arguments to filter UserSessions to count.
     * @example
     * // Count the number of UserSessions
     * const count = await prisma.userSession.count({
     *   where: {
     *     // ... the filter for the UserSessions we want to count
     *   }
     * })
    **/
    count<T extends UserSessionCountArgs>(
      args?: Subset<T, UserSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSessionAggregateArgs>(args: Subset<T, UserSessionAggregateArgs>): Prisma.PrismaPromise<GetUserSessionAggregateType<T>>

    /**
     * Group by UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSessionGroupByArgs['orderBy'] }
        : { orderBy?: UserSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSession model
   */
  readonly fields: UserSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    players<T extends UserSession$playersArgs<ExtArgs> = {}>(args?: Subset<T, UserSession$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activeBoosts<T extends UserSession$activeBoostsArgs<ExtArgs> = {}>(args?: Subset<T, UserSession$activeBoostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSession model
   */
  interface UserSessionFieldRefs {
    readonly id: FieldRef<"UserSession", 'String'>
    readonly xp: FieldRef<"UserSession", 'Int'>
    readonly money: FieldRef<"UserSession", 'Int'>
    readonly joinedAt: FieldRef<"UserSession", 'DateTime'>
    readonly createdAt: FieldRef<"UserSession", 'DateTime'>
    readonly updatedAt: FieldRef<"UserSession", 'DateTime'>
    readonly userId: FieldRef<"UserSession", 'String'>
    readonly sessionId: FieldRef<"UserSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserSession findUnique
   */
  export type UserSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findUniqueOrThrow
   */
  export type UserSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findFirst
   */
  export type UserSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findFirstOrThrow
   */
  export type UserSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findMany
   */
  export type UserSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSessions to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession create
   */
  export type UserSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSession.
     */
    data: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
  }

  /**
   * UserSession createMany
   */
  export type UserSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSession createManyAndReturn
   */
  export type UserSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSession update
   */
  export type UserSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSession.
     */
    data: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
    /**
     * Choose, which UserSession to update.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession updateMany
   */
  export type UserSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
  }

  /**
   * UserSession updateManyAndReturn
   */
  export type UserSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSession upsert
   */
  export type UserSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSession to update in case it exists.
     */
    where: UserSessionWhereUniqueInput
    /**
     * In case the UserSession found by the `where` argument doesn't exist, create a new UserSession with this data.
     */
    create: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
    /**
     * In case the UserSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
  }

  /**
   * UserSession delete
   */
  export type UserSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter which UserSession to delete.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession deleteMany
   */
  export type UserSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSessions to delete
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to delete.
     */
    limit?: number
  }

  /**
   * UserSession.players
   */
  export type UserSession$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    cursor?: PlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * UserSession.activeBoosts
   */
  export type UserSession$activeBoostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    where?: ActiveBoostWhereInput
    orderBy?: ActiveBoostOrderByWithRelationInput | ActiveBoostOrderByWithRelationInput[]
    cursor?: ActiveBoostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveBoostScalarFieldEnum | ActiveBoostScalarFieldEnum[]
  }

  /**
   * UserSession without action
   */
  export type UserSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
  }


  /**
   * Model AvailablePlayer
   */

  export type AggregateAvailablePlayer = {
    _count: AvailablePlayerCountAggregateOutputType | null
    _avg: AvailablePlayerAvgAggregateOutputType | null
    _sum: AvailablePlayerSumAggregateOutputType | null
    _min: AvailablePlayerMinAggregateOutputType | null
    _max: AvailablePlayerMaxAggregateOutputType | null
  }

  export type AvailablePlayerAvgAggregateOutputType = {
    price: number | null
  }

  export type AvailablePlayerSumAggregateOutputType = {
    price: number | null
  }

  export type AvailablePlayerMinAggregateOutputType = {
    id: string | null
    name: string | null
    team: string | null
    position: string | null
    price: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AvailablePlayerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    team: string | null
    position: string | null
    price: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AvailablePlayerCountAggregateOutputType = {
    id: number
    name: number
    team: number
    position: number
    price: number
    stats: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AvailablePlayerAvgAggregateInputType = {
    price?: true
  }

  export type AvailablePlayerSumAggregateInputType = {
    price?: true
  }

  export type AvailablePlayerMinAggregateInputType = {
    id?: true
    name?: true
    team?: true
    position?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AvailablePlayerMaxAggregateInputType = {
    id?: true
    name?: true
    team?: true
    position?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AvailablePlayerCountAggregateInputType = {
    id?: true
    name?: true
    team?: true
    position?: true
    price?: true
    stats?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AvailablePlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailablePlayer to aggregate.
     */
    where?: AvailablePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailablePlayers to fetch.
     */
    orderBy?: AvailablePlayerOrderByWithRelationInput | AvailablePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvailablePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailablePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailablePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvailablePlayers
    **/
    _count?: true | AvailablePlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AvailablePlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AvailablePlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvailablePlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvailablePlayerMaxAggregateInputType
  }

  export type GetAvailablePlayerAggregateType<T extends AvailablePlayerAggregateArgs> = {
        [P in keyof T & keyof AggregateAvailablePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvailablePlayer[P]>
      : GetScalarType<T[P], AggregateAvailablePlayer[P]>
  }




  export type AvailablePlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvailablePlayerWhereInput
    orderBy?: AvailablePlayerOrderByWithAggregationInput | AvailablePlayerOrderByWithAggregationInput[]
    by: AvailablePlayerScalarFieldEnum[] | AvailablePlayerScalarFieldEnum
    having?: AvailablePlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvailablePlayerCountAggregateInputType | true
    _avg?: AvailablePlayerAvgAggregateInputType
    _sum?: AvailablePlayerSumAggregateInputType
    _min?: AvailablePlayerMinAggregateInputType
    _max?: AvailablePlayerMaxAggregateInputType
  }

  export type AvailablePlayerGroupByOutputType = {
    id: string
    name: string
    team: string
    position: string
    price: number
    stats: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: AvailablePlayerCountAggregateOutputType | null
    _avg: AvailablePlayerAvgAggregateOutputType | null
    _sum: AvailablePlayerSumAggregateOutputType | null
    _min: AvailablePlayerMinAggregateOutputType | null
    _max: AvailablePlayerMaxAggregateOutputType | null
  }

  type GetAvailablePlayerGroupByPayload<T extends AvailablePlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvailablePlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvailablePlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvailablePlayerGroupByOutputType[P]>
            : GetScalarType<T[P], AvailablePlayerGroupByOutputType[P]>
        }
      >
    >


  export type AvailablePlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    team?: boolean
    position?: boolean
    price?: boolean
    stats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    players?: boolean | AvailablePlayer$playersArgs<ExtArgs>
    _count?: boolean | AvailablePlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["availablePlayer"]>

  export type AvailablePlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    team?: boolean
    position?: boolean
    price?: boolean
    stats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["availablePlayer"]>

  export type AvailablePlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    team?: boolean
    position?: boolean
    price?: boolean
    stats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["availablePlayer"]>

  export type AvailablePlayerSelectScalar = {
    id?: boolean
    name?: boolean
    team?: boolean
    position?: boolean
    price?: boolean
    stats?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AvailablePlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "team" | "position" | "price" | "stats" | "createdAt" | "updatedAt", ExtArgs["result"]["availablePlayer"]>
  export type AvailablePlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | AvailablePlayer$playersArgs<ExtArgs>
    _count?: boolean | AvailablePlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AvailablePlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AvailablePlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AvailablePlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvailablePlayer"
    objects: {
      players: Prisma.$PlayerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      team: string
      position: string
      price: number
      stats: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["availablePlayer"]>
    composites: {}
  }

  type AvailablePlayerGetPayload<S extends boolean | null | undefined | AvailablePlayerDefaultArgs> = $Result.GetResult<Prisma.$AvailablePlayerPayload, S>

  type AvailablePlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvailablePlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvailablePlayerCountAggregateInputType | true
    }

  export interface AvailablePlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvailablePlayer'], meta: { name: 'AvailablePlayer' } }
    /**
     * Find zero or one AvailablePlayer that matches the filter.
     * @param {AvailablePlayerFindUniqueArgs} args - Arguments to find a AvailablePlayer
     * @example
     * // Get one AvailablePlayer
     * const availablePlayer = await prisma.availablePlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvailablePlayerFindUniqueArgs>(args: SelectSubset<T, AvailablePlayerFindUniqueArgs<ExtArgs>>): Prisma__AvailablePlayerClient<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AvailablePlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvailablePlayerFindUniqueOrThrowArgs} args - Arguments to find a AvailablePlayer
     * @example
     * // Get one AvailablePlayer
     * const availablePlayer = await prisma.availablePlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvailablePlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, AvailablePlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvailablePlayerClient<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailablePlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePlayerFindFirstArgs} args - Arguments to find a AvailablePlayer
     * @example
     * // Get one AvailablePlayer
     * const availablePlayer = await prisma.availablePlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvailablePlayerFindFirstArgs>(args?: SelectSubset<T, AvailablePlayerFindFirstArgs<ExtArgs>>): Prisma__AvailablePlayerClient<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AvailablePlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePlayerFindFirstOrThrowArgs} args - Arguments to find a AvailablePlayer
     * @example
     * // Get one AvailablePlayer
     * const availablePlayer = await prisma.availablePlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvailablePlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, AvailablePlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvailablePlayerClient<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AvailablePlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvailablePlayers
     * const availablePlayers = await prisma.availablePlayer.findMany()
     * 
     * // Get first 10 AvailablePlayers
     * const availablePlayers = await prisma.availablePlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const availablePlayerWithIdOnly = await prisma.availablePlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvailablePlayerFindManyArgs>(args?: SelectSubset<T, AvailablePlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AvailablePlayer.
     * @param {AvailablePlayerCreateArgs} args - Arguments to create a AvailablePlayer.
     * @example
     * // Create one AvailablePlayer
     * const AvailablePlayer = await prisma.availablePlayer.create({
     *   data: {
     *     // ... data to create a AvailablePlayer
     *   }
     * })
     * 
     */
    create<T extends AvailablePlayerCreateArgs>(args: SelectSubset<T, AvailablePlayerCreateArgs<ExtArgs>>): Prisma__AvailablePlayerClient<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AvailablePlayers.
     * @param {AvailablePlayerCreateManyArgs} args - Arguments to create many AvailablePlayers.
     * @example
     * // Create many AvailablePlayers
     * const availablePlayer = await prisma.availablePlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvailablePlayerCreateManyArgs>(args?: SelectSubset<T, AvailablePlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvailablePlayers and returns the data saved in the database.
     * @param {AvailablePlayerCreateManyAndReturnArgs} args - Arguments to create many AvailablePlayers.
     * @example
     * // Create many AvailablePlayers
     * const availablePlayer = await prisma.availablePlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvailablePlayers and only return the `id`
     * const availablePlayerWithIdOnly = await prisma.availablePlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvailablePlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, AvailablePlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AvailablePlayer.
     * @param {AvailablePlayerDeleteArgs} args - Arguments to delete one AvailablePlayer.
     * @example
     * // Delete one AvailablePlayer
     * const AvailablePlayer = await prisma.availablePlayer.delete({
     *   where: {
     *     // ... filter to delete one AvailablePlayer
     *   }
     * })
     * 
     */
    delete<T extends AvailablePlayerDeleteArgs>(args: SelectSubset<T, AvailablePlayerDeleteArgs<ExtArgs>>): Prisma__AvailablePlayerClient<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AvailablePlayer.
     * @param {AvailablePlayerUpdateArgs} args - Arguments to update one AvailablePlayer.
     * @example
     * // Update one AvailablePlayer
     * const availablePlayer = await prisma.availablePlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvailablePlayerUpdateArgs>(args: SelectSubset<T, AvailablePlayerUpdateArgs<ExtArgs>>): Prisma__AvailablePlayerClient<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AvailablePlayers.
     * @param {AvailablePlayerDeleteManyArgs} args - Arguments to filter AvailablePlayers to delete.
     * @example
     * // Delete a few AvailablePlayers
     * const { count } = await prisma.availablePlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvailablePlayerDeleteManyArgs>(args?: SelectSubset<T, AvailablePlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailablePlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvailablePlayers
     * const availablePlayer = await prisma.availablePlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvailablePlayerUpdateManyArgs>(args: SelectSubset<T, AvailablePlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvailablePlayers and returns the data updated in the database.
     * @param {AvailablePlayerUpdateManyAndReturnArgs} args - Arguments to update many AvailablePlayers.
     * @example
     * // Update many AvailablePlayers
     * const availablePlayer = await prisma.availablePlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AvailablePlayers and only return the `id`
     * const availablePlayerWithIdOnly = await prisma.availablePlayer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AvailablePlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, AvailablePlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AvailablePlayer.
     * @param {AvailablePlayerUpsertArgs} args - Arguments to update or create a AvailablePlayer.
     * @example
     * // Update or create a AvailablePlayer
     * const availablePlayer = await prisma.availablePlayer.upsert({
     *   create: {
     *     // ... data to create a AvailablePlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvailablePlayer we want to update
     *   }
     * })
     */
    upsert<T extends AvailablePlayerUpsertArgs>(args: SelectSubset<T, AvailablePlayerUpsertArgs<ExtArgs>>): Prisma__AvailablePlayerClient<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AvailablePlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePlayerCountArgs} args - Arguments to filter AvailablePlayers to count.
     * @example
     * // Count the number of AvailablePlayers
     * const count = await prisma.availablePlayer.count({
     *   where: {
     *     // ... the filter for the AvailablePlayers we want to count
     *   }
     * })
    **/
    count<T extends AvailablePlayerCountArgs>(
      args?: Subset<T, AvailablePlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvailablePlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvailablePlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AvailablePlayerAggregateArgs>(args: Subset<T, AvailablePlayerAggregateArgs>): Prisma.PrismaPromise<GetAvailablePlayerAggregateType<T>>

    /**
     * Group by AvailablePlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvailablePlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AvailablePlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvailablePlayerGroupByArgs['orderBy'] }
        : { orderBy?: AvailablePlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AvailablePlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailablePlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvailablePlayer model
   */
  readonly fields: AvailablePlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvailablePlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvailablePlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends AvailablePlayer$playersArgs<ExtArgs> = {}>(args?: Subset<T, AvailablePlayer$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AvailablePlayer model
   */
  interface AvailablePlayerFieldRefs {
    readonly id: FieldRef<"AvailablePlayer", 'String'>
    readonly name: FieldRef<"AvailablePlayer", 'String'>
    readonly team: FieldRef<"AvailablePlayer", 'String'>
    readonly position: FieldRef<"AvailablePlayer", 'String'>
    readonly price: FieldRef<"AvailablePlayer", 'Int'>
    readonly stats: FieldRef<"AvailablePlayer", 'Json'>
    readonly createdAt: FieldRef<"AvailablePlayer", 'DateTime'>
    readonly updatedAt: FieldRef<"AvailablePlayer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AvailablePlayer findUnique
   */
  export type AvailablePlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePlayerInclude<ExtArgs> | null
    /**
     * Filter, which AvailablePlayer to fetch.
     */
    where: AvailablePlayerWhereUniqueInput
  }

  /**
   * AvailablePlayer findUniqueOrThrow
   */
  export type AvailablePlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePlayerInclude<ExtArgs> | null
    /**
     * Filter, which AvailablePlayer to fetch.
     */
    where: AvailablePlayerWhereUniqueInput
  }

  /**
   * AvailablePlayer findFirst
   */
  export type AvailablePlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePlayerInclude<ExtArgs> | null
    /**
     * Filter, which AvailablePlayer to fetch.
     */
    where?: AvailablePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailablePlayers to fetch.
     */
    orderBy?: AvailablePlayerOrderByWithRelationInput | AvailablePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailablePlayers.
     */
    cursor?: AvailablePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailablePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailablePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailablePlayers.
     */
    distinct?: AvailablePlayerScalarFieldEnum | AvailablePlayerScalarFieldEnum[]
  }

  /**
   * AvailablePlayer findFirstOrThrow
   */
  export type AvailablePlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePlayerInclude<ExtArgs> | null
    /**
     * Filter, which AvailablePlayer to fetch.
     */
    where?: AvailablePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailablePlayers to fetch.
     */
    orderBy?: AvailablePlayerOrderByWithRelationInput | AvailablePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvailablePlayers.
     */
    cursor?: AvailablePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailablePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailablePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvailablePlayers.
     */
    distinct?: AvailablePlayerScalarFieldEnum | AvailablePlayerScalarFieldEnum[]
  }

  /**
   * AvailablePlayer findMany
   */
  export type AvailablePlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePlayerInclude<ExtArgs> | null
    /**
     * Filter, which AvailablePlayers to fetch.
     */
    where?: AvailablePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvailablePlayers to fetch.
     */
    orderBy?: AvailablePlayerOrderByWithRelationInput | AvailablePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvailablePlayers.
     */
    cursor?: AvailablePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvailablePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvailablePlayers.
     */
    skip?: number
    distinct?: AvailablePlayerScalarFieldEnum | AvailablePlayerScalarFieldEnum[]
  }

  /**
   * AvailablePlayer create
   */
  export type AvailablePlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a AvailablePlayer.
     */
    data: XOR<AvailablePlayerCreateInput, AvailablePlayerUncheckedCreateInput>
  }

  /**
   * AvailablePlayer createMany
   */
  export type AvailablePlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvailablePlayers.
     */
    data: AvailablePlayerCreateManyInput | AvailablePlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailablePlayer createManyAndReturn
   */
  export type AvailablePlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * The data used to create many AvailablePlayers.
     */
    data: AvailablePlayerCreateManyInput | AvailablePlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvailablePlayer update
   */
  export type AvailablePlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a AvailablePlayer.
     */
    data: XOR<AvailablePlayerUpdateInput, AvailablePlayerUncheckedUpdateInput>
    /**
     * Choose, which AvailablePlayer to update.
     */
    where: AvailablePlayerWhereUniqueInput
  }

  /**
   * AvailablePlayer updateMany
   */
  export type AvailablePlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvailablePlayers.
     */
    data: XOR<AvailablePlayerUpdateManyMutationInput, AvailablePlayerUncheckedUpdateManyInput>
    /**
     * Filter which AvailablePlayers to update
     */
    where?: AvailablePlayerWhereInput
    /**
     * Limit how many AvailablePlayers to update.
     */
    limit?: number
  }

  /**
   * AvailablePlayer updateManyAndReturn
   */
  export type AvailablePlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * The data used to update AvailablePlayers.
     */
    data: XOR<AvailablePlayerUpdateManyMutationInput, AvailablePlayerUncheckedUpdateManyInput>
    /**
     * Filter which AvailablePlayers to update
     */
    where?: AvailablePlayerWhereInput
    /**
     * Limit how many AvailablePlayers to update.
     */
    limit?: number
  }

  /**
   * AvailablePlayer upsert
   */
  export type AvailablePlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the AvailablePlayer to update in case it exists.
     */
    where: AvailablePlayerWhereUniqueInput
    /**
     * In case the AvailablePlayer found by the `where` argument doesn't exist, create a new AvailablePlayer with this data.
     */
    create: XOR<AvailablePlayerCreateInput, AvailablePlayerUncheckedCreateInput>
    /**
     * In case the AvailablePlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvailablePlayerUpdateInput, AvailablePlayerUncheckedUpdateInput>
  }

  /**
   * AvailablePlayer delete
   */
  export type AvailablePlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePlayerInclude<ExtArgs> | null
    /**
     * Filter which AvailablePlayer to delete.
     */
    where: AvailablePlayerWhereUniqueInput
  }

  /**
   * AvailablePlayer deleteMany
   */
  export type AvailablePlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvailablePlayers to delete
     */
    where?: AvailablePlayerWhereInput
    /**
     * Limit how many AvailablePlayers to delete.
     */
    limit?: number
  }

  /**
   * AvailablePlayer.players
   */
  export type AvailablePlayer$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    cursor?: PlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * AvailablePlayer without action
   */
  export type AvailablePlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailablePlayer
     */
    select?: AvailablePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AvailablePlayer
     */
    omit?: AvailablePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvailablePlayerInclude<ExtArgs> | null
  }


  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerAvgAggregateOutputType = {
    xp: number | null
  }

  export type PlayerSumAggregateOutputType = {
    xp: number | null
  }

  export type PlayerMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    xp: number | null
    team: string | null
    position: string | null
    active: boolean | null
    userSessionId: string | null
    availablePlayerId: string | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    xp: number | null
    team: string | null
    position: string | null
    active: boolean | null
    userSessionId: string | null
    availablePlayerId: string | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    xp: number
    team: number
    position: number
    active: number
    statCategoryXp: number
    boosts: number
    userSessionId: number
    availablePlayerId: number
    _all: number
  }


  export type PlayerAvgAggregateInputType = {
    xp?: true
  }

  export type PlayerSumAggregateInputType = {
    xp?: true
  }

  export type PlayerMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    xp?: true
    team?: true
    position?: true
    active?: true
    userSessionId?: true
    availablePlayerId?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    xp?: true
    team?: true
    position?: true
    active?: true
    userSessionId?: true
    availablePlayerId?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    xp?: true
    team?: true
    position?: true
    active?: true
    statCategoryXp?: true
    boosts?: true
    userSessionId?: true
    availablePlayerId?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _avg?: PlayerAvgAggregateInputType
    _sum?: PlayerSumAggregateInputType
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    xp: number
    team: string
    position: string
    active: boolean
    statCategoryXp: JsonValue
    boosts: JsonValue
    userSessionId: string
    availablePlayerId: string
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    xp?: boolean
    team?: boolean
    position?: boolean
    active?: boolean
    statCategoryXp?: boolean
    boosts?: boolean
    userSessionId?: boolean
    availablePlayerId?: boolean
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
    availablePlayer?: boolean | AvailablePlayerDefaultArgs<ExtArgs>
    activeBoosts?: boolean | Player$activeBoostsArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    xp?: boolean
    team?: boolean
    position?: boolean
    active?: boolean
    statCategoryXp?: boolean
    boosts?: boolean
    userSessionId?: boolean
    availablePlayerId?: boolean
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
    availablePlayer?: boolean | AvailablePlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    xp?: boolean
    team?: boolean
    position?: boolean
    active?: boolean
    statCategoryXp?: boolean
    boosts?: boolean
    userSessionId?: boolean
    availablePlayerId?: boolean
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
    availablePlayer?: boolean | AvailablePlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    xp?: boolean
    team?: boolean
    position?: boolean
    active?: boolean
    statCategoryXp?: boolean
    boosts?: boolean
    userSessionId?: boolean
    availablePlayerId?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt" | "xp" | "team" | "position" | "active" | "statCategoryXp" | "boosts" | "userSessionId" | "availablePlayerId", ExtArgs["result"]["player"]>
  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
    availablePlayer?: boolean | AvailablePlayerDefaultArgs<ExtArgs>
    activeBoosts?: boolean | Player$activeBoostsArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
    availablePlayer?: boolean | AvailablePlayerDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
    availablePlayer?: boolean | AvailablePlayerDefaultArgs<ExtArgs>
  }

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      userSession: Prisma.$UserSessionPayload<ExtArgs>
      availablePlayer: Prisma.$AvailablePlayerPayload<ExtArgs>
      activeBoosts: Prisma.$ActiveBoostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
      xp: number
      team: string
      position: string
      active: boolean
      statCategoryXp: Prisma.JsonValue
      boosts: Prisma.JsonValue
      userSessionId: string
      availablePlayerId: string
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players and returns the data updated in the database.
     * @param {PlayerUpdateManyAndReturnArgs} args - Arguments to update many Players.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userSession<T extends UserSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserSessionDefaultArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    availablePlayer<T extends AvailablePlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AvailablePlayerDefaultArgs<ExtArgs>>): Prisma__AvailablePlayerClient<$Result.GetResult<Prisma.$AvailablePlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    activeBoosts<T extends Player$activeBoostsArgs<ExtArgs> = {}>(args?: Subset<T, Player$activeBoostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'String'>
    readonly name: FieldRef<"Player", 'String'>
    readonly createdAt: FieldRef<"Player", 'DateTime'>
    readonly updatedAt: FieldRef<"Player", 'DateTime'>
    readonly xp: FieldRef<"Player", 'Int'>
    readonly team: FieldRef<"Player", 'String'>
    readonly position: FieldRef<"Player", 'String'>
    readonly active: FieldRef<"Player", 'Boolean'>
    readonly statCategoryXp: FieldRef<"Player", 'Json'>
    readonly boosts: FieldRef<"Player", 'Json'>
    readonly userSessionId: FieldRef<"Player", 'String'>
    readonly availablePlayerId: FieldRef<"Player", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player updateManyAndReturn
   */
  export type PlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player.activeBoosts
   */
  export type Player$activeBoostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    where?: ActiveBoostWhereInput
    orderBy?: ActiveBoostOrderByWithRelationInput | ActiveBoostOrderByWithRelationInput[]
    cursor?: ActiveBoostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveBoostScalarFieldEnum | ActiveBoostScalarFieldEnum[]
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Model Boost
   */

  export type AggregateBoost = {
    _count: BoostCountAggregateOutputType | null
    _avg: BoostAvgAggregateOutputType | null
    _sum: BoostSumAggregateOutputType | null
    _min: BoostMinAggregateOutputType | null
    _max: BoostMaxAggregateOutputType | null
  }

  export type BoostAvgAggregateOutputType = {
    multiplier: number | null
    duration: number | null
    cost: number | null
  }

  export type BoostSumAggregateOutputType = {
    multiplier: number | null
    duration: number | null
    cost: number | null
  }

  export type BoostMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    multiplier: number | null
    duration: number | null
    cost: number | null
    boostType: string | null
  }

  export type BoostMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    multiplier: number | null
    duration: number | null
    cost: number | null
    boostType: string | null
  }

  export type BoostCountAggregateOutputType = {
    id: number
    name: number
    description: number
    multiplier: number
    duration: number
    cost: number
    boostType: number
    _all: number
  }


  export type BoostAvgAggregateInputType = {
    multiplier?: true
    duration?: true
    cost?: true
  }

  export type BoostSumAggregateInputType = {
    multiplier?: true
    duration?: true
    cost?: true
  }

  export type BoostMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    multiplier?: true
    duration?: true
    cost?: true
    boostType?: true
  }

  export type BoostMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    multiplier?: true
    duration?: true
    cost?: true
    boostType?: true
  }

  export type BoostCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    multiplier?: true
    duration?: true
    cost?: true
    boostType?: true
    _all?: true
  }

  export type BoostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Boost to aggregate.
     */
    where?: BoostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boosts to fetch.
     */
    orderBy?: BoostOrderByWithRelationInput | BoostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BoostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Boosts
    **/
    _count?: true | BoostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BoostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BoostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BoostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BoostMaxAggregateInputType
  }

  export type GetBoostAggregateType<T extends BoostAggregateArgs> = {
        [P in keyof T & keyof AggregateBoost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBoost[P]>
      : GetScalarType<T[P], AggregateBoost[P]>
  }




  export type BoostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BoostWhereInput
    orderBy?: BoostOrderByWithAggregationInput | BoostOrderByWithAggregationInput[]
    by: BoostScalarFieldEnum[] | BoostScalarFieldEnum
    having?: BoostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BoostCountAggregateInputType | true
    _avg?: BoostAvgAggregateInputType
    _sum?: BoostSumAggregateInputType
    _min?: BoostMinAggregateInputType
    _max?: BoostMaxAggregateInputType
  }

  export type BoostGroupByOutputType = {
    id: string
    name: string
    description: string
    multiplier: number
    duration: number
    cost: number
    boostType: string
    _count: BoostCountAggregateOutputType | null
    _avg: BoostAvgAggregateOutputType | null
    _sum: BoostSumAggregateOutputType | null
    _min: BoostMinAggregateOutputType | null
    _max: BoostMaxAggregateOutputType | null
  }

  type GetBoostGroupByPayload<T extends BoostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BoostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BoostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BoostGroupByOutputType[P]>
            : GetScalarType<T[P], BoostGroupByOutputType[P]>
        }
      >
    >


  export type BoostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    multiplier?: boolean
    duration?: boolean
    cost?: boolean
    boostType?: boolean
    activeBoosts?: boolean | Boost$activeBoostsArgs<ExtArgs>
    _count?: boolean | BoostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["boost"]>

  export type BoostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    multiplier?: boolean
    duration?: boolean
    cost?: boolean
    boostType?: boolean
  }, ExtArgs["result"]["boost"]>

  export type BoostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    multiplier?: boolean
    duration?: boolean
    cost?: boolean
    boostType?: boolean
  }, ExtArgs["result"]["boost"]>

  export type BoostSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    multiplier?: boolean
    duration?: boolean
    cost?: boolean
    boostType?: boolean
  }

  export type BoostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "multiplier" | "duration" | "cost" | "boostType", ExtArgs["result"]["boost"]>
  export type BoostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activeBoosts?: boolean | Boost$activeBoostsArgs<ExtArgs>
    _count?: boolean | BoostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BoostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BoostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BoostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Boost"
    objects: {
      activeBoosts: Prisma.$ActiveBoostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      multiplier: number
      duration: number
      cost: number
      boostType: string
    }, ExtArgs["result"]["boost"]>
    composites: {}
  }

  type BoostGetPayload<S extends boolean | null | undefined | BoostDefaultArgs> = $Result.GetResult<Prisma.$BoostPayload, S>

  type BoostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BoostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BoostCountAggregateInputType | true
    }

  export interface BoostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Boost'], meta: { name: 'Boost' } }
    /**
     * Find zero or one Boost that matches the filter.
     * @param {BoostFindUniqueArgs} args - Arguments to find a Boost
     * @example
     * // Get one Boost
     * const boost = await prisma.boost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoostFindUniqueArgs>(args: SelectSubset<T, BoostFindUniqueArgs<ExtArgs>>): Prisma__BoostClient<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Boost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoostFindUniqueOrThrowArgs} args - Arguments to find a Boost
     * @example
     * // Get one Boost
     * const boost = await prisma.boost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoostFindUniqueOrThrowArgs>(args: SelectSubset<T, BoostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BoostClient<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Boost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoostFindFirstArgs} args - Arguments to find a Boost
     * @example
     * // Get one Boost
     * const boost = await prisma.boost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoostFindFirstArgs>(args?: SelectSubset<T, BoostFindFirstArgs<ExtArgs>>): Prisma__BoostClient<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Boost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoostFindFirstOrThrowArgs} args - Arguments to find a Boost
     * @example
     * // Get one Boost
     * const boost = await prisma.boost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoostFindFirstOrThrowArgs>(args?: SelectSubset<T, BoostFindFirstOrThrowArgs<ExtArgs>>): Prisma__BoostClient<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Boosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Boosts
     * const boosts = await prisma.boost.findMany()
     * 
     * // Get first 10 Boosts
     * const boosts = await prisma.boost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const boostWithIdOnly = await prisma.boost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BoostFindManyArgs>(args?: SelectSubset<T, BoostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Boost.
     * @param {BoostCreateArgs} args - Arguments to create a Boost.
     * @example
     * // Create one Boost
     * const Boost = await prisma.boost.create({
     *   data: {
     *     // ... data to create a Boost
     *   }
     * })
     * 
     */
    create<T extends BoostCreateArgs>(args: SelectSubset<T, BoostCreateArgs<ExtArgs>>): Prisma__BoostClient<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Boosts.
     * @param {BoostCreateManyArgs} args - Arguments to create many Boosts.
     * @example
     * // Create many Boosts
     * const boost = await prisma.boost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BoostCreateManyArgs>(args?: SelectSubset<T, BoostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Boosts and returns the data saved in the database.
     * @param {BoostCreateManyAndReturnArgs} args - Arguments to create many Boosts.
     * @example
     * // Create many Boosts
     * const boost = await prisma.boost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Boosts and only return the `id`
     * const boostWithIdOnly = await prisma.boost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BoostCreateManyAndReturnArgs>(args?: SelectSubset<T, BoostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Boost.
     * @param {BoostDeleteArgs} args - Arguments to delete one Boost.
     * @example
     * // Delete one Boost
     * const Boost = await prisma.boost.delete({
     *   where: {
     *     // ... filter to delete one Boost
     *   }
     * })
     * 
     */
    delete<T extends BoostDeleteArgs>(args: SelectSubset<T, BoostDeleteArgs<ExtArgs>>): Prisma__BoostClient<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Boost.
     * @param {BoostUpdateArgs} args - Arguments to update one Boost.
     * @example
     * // Update one Boost
     * const boost = await prisma.boost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BoostUpdateArgs>(args: SelectSubset<T, BoostUpdateArgs<ExtArgs>>): Prisma__BoostClient<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Boosts.
     * @param {BoostDeleteManyArgs} args - Arguments to filter Boosts to delete.
     * @example
     * // Delete a few Boosts
     * const { count } = await prisma.boost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BoostDeleteManyArgs>(args?: SelectSubset<T, BoostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Boosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Boosts
     * const boost = await prisma.boost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BoostUpdateManyArgs>(args: SelectSubset<T, BoostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Boosts and returns the data updated in the database.
     * @param {BoostUpdateManyAndReturnArgs} args - Arguments to update many Boosts.
     * @example
     * // Update many Boosts
     * const boost = await prisma.boost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Boosts and only return the `id`
     * const boostWithIdOnly = await prisma.boost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BoostUpdateManyAndReturnArgs>(args: SelectSubset<T, BoostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Boost.
     * @param {BoostUpsertArgs} args - Arguments to update or create a Boost.
     * @example
     * // Update or create a Boost
     * const boost = await prisma.boost.upsert({
     *   create: {
     *     // ... data to create a Boost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Boost we want to update
     *   }
     * })
     */
    upsert<T extends BoostUpsertArgs>(args: SelectSubset<T, BoostUpsertArgs<ExtArgs>>): Prisma__BoostClient<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Boosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoostCountArgs} args - Arguments to filter Boosts to count.
     * @example
     * // Count the number of Boosts
     * const count = await prisma.boost.count({
     *   where: {
     *     // ... the filter for the Boosts we want to count
     *   }
     * })
    **/
    count<T extends BoostCountArgs>(
      args?: Subset<T, BoostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Boost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BoostAggregateArgs>(args: Subset<T, BoostAggregateArgs>): Prisma.PrismaPromise<GetBoostAggregateType<T>>

    /**
     * Group by Boost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BoostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BoostGroupByArgs['orderBy'] }
        : { orderBy?: BoostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BoostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Boost model
   */
  readonly fields: BoostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Boost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BoostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activeBoosts<T extends Boost$activeBoostsArgs<ExtArgs> = {}>(args?: Subset<T, Boost$activeBoostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Boost model
   */
  interface BoostFieldRefs {
    readonly id: FieldRef<"Boost", 'String'>
    readonly name: FieldRef<"Boost", 'String'>
    readonly description: FieldRef<"Boost", 'String'>
    readonly multiplier: FieldRef<"Boost", 'Float'>
    readonly duration: FieldRef<"Boost", 'Int'>
    readonly cost: FieldRef<"Boost", 'Int'>
    readonly boostType: FieldRef<"Boost", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Boost findUnique
   */
  export type BoostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoostInclude<ExtArgs> | null
    /**
     * Filter, which Boost to fetch.
     */
    where: BoostWhereUniqueInput
  }

  /**
   * Boost findUniqueOrThrow
   */
  export type BoostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoostInclude<ExtArgs> | null
    /**
     * Filter, which Boost to fetch.
     */
    where: BoostWhereUniqueInput
  }

  /**
   * Boost findFirst
   */
  export type BoostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoostInclude<ExtArgs> | null
    /**
     * Filter, which Boost to fetch.
     */
    where?: BoostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boosts to fetch.
     */
    orderBy?: BoostOrderByWithRelationInput | BoostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Boosts.
     */
    cursor?: BoostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Boosts.
     */
    distinct?: BoostScalarFieldEnum | BoostScalarFieldEnum[]
  }

  /**
   * Boost findFirstOrThrow
   */
  export type BoostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoostInclude<ExtArgs> | null
    /**
     * Filter, which Boost to fetch.
     */
    where?: BoostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boosts to fetch.
     */
    orderBy?: BoostOrderByWithRelationInput | BoostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Boosts.
     */
    cursor?: BoostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Boosts.
     */
    distinct?: BoostScalarFieldEnum | BoostScalarFieldEnum[]
  }

  /**
   * Boost findMany
   */
  export type BoostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoostInclude<ExtArgs> | null
    /**
     * Filter, which Boosts to fetch.
     */
    where?: BoostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Boosts to fetch.
     */
    orderBy?: BoostOrderByWithRelationInput | BoostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Boosts.
     */
    cursor?: BoostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Boosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Boosts.
     */
    skip?: number
    distinct?: BoostScalarFieldEnum | BoostScalarFieldEnum[]
  }

  /**
   * Boost create
   */
  export type BoostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoostInclude<ExtArgs> | null
    /**
     * The data needed to create a Boost.
     */
    data: XOR<BoostCreateInput, BoostUncheckedCreateInput>
  }

  /**
   * Boost createMany
   */
  export type BoostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Boosts.
     */
    data: BoostCreateManyInput | BoostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Boost createManyAndReturn
   */
  export type BoostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * The data used to create many Boosts.
     */
    data: BoostCreateManyInput | BoostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Boost update
   */
  export type BoostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoostInclude<ExtArgs> | null
    /**
     * The data needed to update a Boost.
     */
    data: XOR<BoostUpdateInput, BoostUncheckedUpdateInput>
    /**
     * Choose, which Boost to update.
     */
    where: BoostWhereUniqueInput
  }

  /**
   * Boost updateMany
   */
  export type BoostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Boosts.
     */
    data: XOR<BoostUpdateManyMutationInput, BoostUncheckedUpdateManyInput>
    /**
     * Filter which Boosts to update
     */
    where?: BoostWhereInput
    /**
     * Limit how many Boosts to update.
     */
    limit?: number
  }

  /**
   * Boost updateManyAndReturn
   */
  export type BoostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * The data used to update Boosts.
     */
    data: XOR<BoostUpdateManyMutationInput, BoostUncheckedUpdateManyInput>
    /**
     * Filter which Boosts to update
     */
    where?: BoostWhereInput
    /**
     * Limit how many Boosts to update.
     */
    limit?: number
  }

  /**
   * Boost upsert
   */
  export type BoostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoostInclude<ExtArgs> | null
    /**
     * The filter to search for the Boost to update in case it exists.
     */
    where: BoostWhereUniqueInput
    /**
     * In case the Boost found by the `where` argument doesn't exist, create a new Boost with this data.
     */
    create: XOR<BoostCreateInput, BoostUncheckedCreateInput>
    /**
     * In case the Boost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BoostUpdateInput, BoostUncheckedUpdateInput>
  }

  /**
   * Boost delete
   */
  export type BoostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoostInclude<ExtArgs> | null
    /**
     * Filter which Boost to delete.
     */
    where: BoostWhereUniqueInput
  }

  /**
   * Boost deleteMany
   */
  export type BoostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Boosts to delete
     */
    where?: BoostWhereInput
    /**
     * Limit how many Boosts to delete.
     */
    limit?: number
  }

  /**
   * Boost.activeBoosts
   */
  export type Boost$activeBoostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    where?: ActiveBoostWhereInput
    orderBy?: ActiveBoostOrderByWithRelationInput | ActiveBoostOrderByWithRelationInput[]
    cursor?: ActiveBoostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveBoostScalarFieldEnum | ActiveBoostScalarFieldEnum[]
  }

  /**
   * Boost without action
   */
  export type BoostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Boost
     */
    select?: BoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Boost
     */
    omit?: BoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BoostInclude<ExtArgs> | null
  }


  /**
   * Model ActiveBoost
   */

  export type AggregateActiveBoost = {
    _count: ActiveBoostCountAggregateOutputType | null
    _min: ActiveBoostMinAggregateOutputType | null
    _max: ActiveBoostMaxAggregateOutputType | null
  }

  export type ActiveBoostMinAggregateOutputType = {
    id: string | null
    boostId: string | null
    playerId: string | null
    completed: boolean | null
    endTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userSessionId: string | null
  }

  export type ActiveBoostMaxAggregateOutputType = {
    id: string | null
    boostId: string | null
    playerId: string | null
    completed: boolean | null
    endTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userSessionId: string | null
  }

  export type ActiveBoostCountAggregateOutputType = {
    id: number
    boostId: number
    playerId: number
    completed: number
    endTime: number
    createdAt: number
    updatedAt: number
    userSessionId: number
    _all: number
  }


  export type ActiveBoostMinAggregateInputType = {
    id?: true
    boostId?: true
    playerId?: true
    completed?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    userSessionId?: true
  }

  export type ActiveBoostMaxAggregateInputType = {
    id?: true
    boostId?: true
    playerId?: true
    completed?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    userSessionId?: true
  }

  export type ActiveBoostCountAggregateInputType = {
    id?: true
    boostId?: true
    playerId?: true
    completed?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    userSessionId?: true
    _all?: true
  }

  export type ActiveBoostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveBoost to aggregate.
     */
    where?: ActiveBoostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveBoosts to fetch.
     */
    orderBy?: ActiveBoostOrderByWithRelationInput | ActiveBoostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActiveBoostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveBoosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveBoosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActiveBoosts
    **/
    _count?: true | ActiveBoostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActiveBoostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActiveBoostMaxAggregateInputType
  }

  export type GetActiveBoostAggregateType<T extends ActiveBoostAggregateArgs> = {
        [P in keyof T & keyof AggregateActiveBoost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActiveBoost[P]>
      : GetScalarType<T[P], AggregateActiveBoost[P]>
  }




  export type ActiveBoostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveBoostWhereInput
    orderBy?: ActiveBoostOrderByWithAggregationInput | ActiveBoostOrderByWithAggregationInput[]
    by: ActiveBoostScalarFieldEnum[] | ActiveBoostScalarFieldEnum
    having?: ActiveBoostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActiveBoostCountAggregateInputType | true
    _min?: ActiveBoostMinAggregateInputType
    _max?: ActiveBoostMaxAggregateInputType
  }

  export type ActiveBoostGroupByOutputType = {
    id: string
    boostId: string
    playerId: string
    completed: boolean
    endTime: Date | null
    createdAt: Date
    updatedAt: Date
    userSessionId: string
    _count: ActiveBoostCountAggregateOutputType | null
    _min: ActiveBoostMinAggregateOutputType | null
    _max: ActiveBoostMaxAggregateOutputType | null
  }

  type GetActiveBoostGroupByPayload<T extends ActiveBoostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActiveBoostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActiveBoostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActiveBoostGroupByOutputType[P]>
            : GetScalarType<T[P], ActiveBoostGroupByOutputType[P]>
        }
      >
    >


  export type ActiveBoostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boostId?: boolean
    playerId?: boolean
    completed?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userSessionId?: boolean
    boost?: boolean | BoostDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeBoost"]>

  export type ActiveBoostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boostId?: boolean
    playerId?: boolean
    completed?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userSessionId?: boolean
    boost?: boolean | BoostDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeBoost"]>

  export type ActiveBoostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    boostId?: boolean
    playerId?: boolean
    completed?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userSessionId?: boolean
    boost?: boolean | BoostDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeBoost"]>

  export type ActiveBoostSelectScalar = {
    id?: boolean
    boostId?: boolean
    playerId?: boolean
    completed?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userSessionId?: boolean
  }

  export type ActiveBoostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "boostId" | "playerId" | "completed" | "endTime" | "createdAt" | "updatedAt" | "userSessionId", ExtArgs["result"]["activeBoost"]>
  export type ActiveBoostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    boost?: boolean | BoostDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
  }
  export type ActiveBoostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    boost?: boolean | BoostDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
  }
  export type ActiveBoostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    boost?: boolean | BoostDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    userSession?: boolean | UserSessionDefaultArgs<ExtArgs>
  }

  export type $ActiveBoostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActiveBoost"
    objects: {
      boost: Prisma.$BoostPayload<ExtArgs>
      player: Prisma.$PlayerPayload<ExtArgs>
      userSession: Prisma.$UserSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      boostId: string
      playerId: string
      completed: boolean
      endTime: Date | null
      createdAt: Date
      updatedAt: Date
      userSessionId: string
    }, ExtArgs["result"]["activeBoost"]>
    composites: {}
  }

  type ActiveBoostGetPayload<S extends boolean | null | undefined | ActiveBoostDefaultArgs> = $Result.GetResult<Prisma.$ActiveBoostPayload, S>

  type ActiveBoostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActiveBoostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActiveBoostCountAggregateInputType | true
    }

  export interface ActiveBoostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActiveBoost'], meta: { name: 'ActiveBoost' } }
    /**
     * Find zero or one ActiveBoost that matches the filter.
     * @param {ActiveBoostFindUniqueArgs} args - Arguments to find a ActiveBoost
     * @example
     * // Get one ActiveBoost
     * const activeBoost = await prisma.activeBoost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActiveBoostFindUniqueArgs>(args: SelectSubset<T, ActiveBoostFindUniqueArgs<ExtArgs>>): Prisma__ActiveBoostClient<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActiveBoost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActiveBoostFindUniqueOrThrowArgs} args - Arguments to find a ActiveBoost
     * @example
     * // Get one ActiveBoost
     * const activeBoost = await prisma.activeBoost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActiveBoostFindUniqueOrThrowArgs>(args: SelectSubset<T, ActiveBoostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActiveBoostClient<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActiveBoost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveBoostFindFirstArgs} args - Arguments to find a ActiveBoost
     * @example
     * // Get one ActiveBoost
     * const activeBoost = await prisma.activeBoost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActiveBoostFindFirstArgs>(args?: SelectSubset<T, ActiveBoostFindFirstArgs<ExtArgs>>): Prisma__ActiveBoostClient<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActiveBoost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveBoostFindFirstOrThrowArgs} args - Arguments to find a ActiveBoost
     * @example
     * // Get one ActiveBoost
     * const activeBoost = await prisma.activeBoost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActiveBoostFindFirstOrThrowArgs>(args?: SelectSubset<T, ActiveBoostFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActiveBoostClient<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActiveBoosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveBoostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActiveBoosts
     * const activeBoosts = await prisma.activeBoost.findMany()
     * 
     * // Get first 10 ActiveBoosts
     * const activeBoosts = await prisma.activeBoost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activeBoostWithIdOnly = await prisma.activeBoost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActiveBoostFindManyArgs>(args?: SelectSubset<T, ActiveBoostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActiveBoost.
     * @param {ActiveBoostCreateArgs} args - Arguments to create a ActiveBoost.
     * @example
     * // Create one ActiveBoost
     * const ActiveBoost = await prisma.activeBoost.create({
     *   data: {
     *     // ... data to create a ActiveBoost
     *   }
     * })
     * 
     */
    create<T extends ActiveBoostCreateArgs>(args: SelectSubset<T, ActiveBoostCreateArgs<ExtArgs>>): Prisma__ActiveBoostClient<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActiveBoosts.
     * @param {ActiveBoostCreateManyArgs} args - Arguments to create many ActiveBoosts.
     * @example
     * // Create many ActiveBoosts
     * const activeBoost = await prisma.activeBoost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActiveBoostCreateManyArgs>(args?: SelectSubset<T, ActiveBoostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActiveBoosts and returns the data saved in the database.
     * @param {ActiveBoostCreateManyAndReturnArgs} args - Arguments to create many ActiveBoosts.
     * @example
     * // Create many ActiveBoosts
     * const activeBoost = await prisma.activeBoost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActiveBoosts and only return the `id`
     * const activeBoostWithIdOnly = await prisma.activeBoost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActiveBoostCreateManyAndReturnArgs>(args?: SelectSubset<T, ActiveBoostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActiveBoost.
     * @param {ActiveBoostDeleteArgs} args - Arguments to delete one ActiveBoost.
     * @example
     * // Delete one ActiveBoost
     * const ActiveBoost = await prisma.activeBoost.delete({
     *   where: {
     *     // ... filter to delete one ActiveBoost
     *   }
     * })
     * 
     */
    delete<T extends ActiveBoostDeleteArgs>(args: SelectSubset<T, ActiveBoostDeleteArgs<ExtArgs>>): Prisma__ActiveBoostClient<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActiveBoost.
     * @param {ActiveBoostUpdateArgs} args - Arguments to update one ActiveBoost.
     * @example
     * // Update one ActiveBoost
     * const activeBoost = await prisma.activeBoost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActiveBoostUpdateArgs>(args: SelectSubset<T, ActiveBoostUpdateArgs<ExtArgs>>): Prisma__ActiveBoostClient<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActiveBoosts.
     * @param {ActiveBoostDeleteManyArgs} args - Arguments to filter ActiveBoosts to delete.
     * @example
     * // Delete a few ActiveBoosts
     * const { count } = await prisma.activeBoost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActiveBoostDeleteManyArgs>(args?: SelectSubset<T, ActiveBoostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActiveBoosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveBoostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActiveBoosts
     * const activeBoost = await prisma.activeBoost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActiveBoostUpdateManyArgs>(args: SelectSubset<T, ActiveBoostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActiveBoosts and returns the data updated in the database.
     * @param {ActiveBoostUpdateManyAndReturnArgs} args - Arguments to update many ActiveBoosts.
     * @example
     * // Update many ActiveBoosts
     * const activeBoost = await prisma.activeBoost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActiveBoosts and only return the `id`
     * const activeBoostWithIdOnly = await prisma.activeBoost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActiveBoostUpdateManyAndReturnArgs>(args: SelectSubset<T, ActiveBoostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActiveBoost.
     * @param {ActiveBoostUpsertArgs} args - Arguments to update or create a ActiveBoost.
     * @example
     * // Update or create a ActiveBoost
     * const activeBoost = await prisma.activeBoost.upsert({
     *   create: {
     *     // ... data to create a ActiveBoost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActiveBoost we want to update
     *   }
     * })
     */
    upsert<T extends ActiveBoostUpsertArgs>(args: SelectSubset<T, ActiveBoostUpsertArgs<ExtArgs>>): Prisma__ActiveBoostClient<$Result.GetResult<Prisma.$ActiveBoostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActiveBoosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveBoostCountArgs} args - Arguments to filter ActiveBoosts to count.
     * @example
     * // Count the number of ActiveBoosts
     * const count = await prisma.activeBoost.count({
     *   where: {
     *     // ... the filter for the ActiveBoosts we want to count
     *   }
     * })
    **/
    count<T extends ActiveBoostCountArgs>(
      args?: Subset<T, ActiveBoostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActiveBoostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActiveBoost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveBoostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActiveBoostAggregateArgs>(args: Subset<T, ActiveBoostAggregateArgs>): Prisma.PrismaPromise<GetActiveBoostAggregateType<T>>

    /**
     * Group by ActiveBoost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveBoostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActiveBoostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActiveBoostGroupByArgs['orderBy'] }
        : { orderBy?: ActiveBoostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActiveBoostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActiveBoostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActiveBoost model
   */
  readonly fields: ActiveBoostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActiveBoost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActiveBoostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    boost<T extends BoostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BoostDefaultArgs<ExtArgs>>): Prisma__BoostClient<$Result.GetResult<Prisma.$BoostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userSession<T extends UserSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserSessionDefaultArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActiveBoost model
   */
  interface ActiveBoostFieldRefs {
    readonly id: FieldRef<"ActiveBoost", 'String'>
    readonly boostId: FieldRef<"ActiveBoost", 'String'>
    readonly playerId: FieldRef<"ActiveBoost", 'String'>
    readonly completed: FieldRef<"ActiveBoost", 'Boolean'>
    readonly endTime: FieldRef<"ActiveBoost", 'DateTime'>
    readonly createdAt: FieldRef<"ActiveBoost", 'DateTime'>
    readonly updatedAt: FieldRef<"ActiveBoost", 'DateTime'>
    readonly userSessionId: FieldRef<"ActiveBoost", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ActiveBoost findUnique
   */
  export type ActiveBoostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    /**
     * Filter, which ActiveBoost to fetch.
     */
    where: ActiveBoostWhereUniqueInput
  }

  /**
   * ActiveBoost findUniqueOrThrow
   */
  export type ActiveBoostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    /**
     * Filter, which ActiveBoost to fetch.
     */
    where: ActiveBoostWhereUniqueInput
  }

  /**
   * ActiveBoost findFirst
   */
  export type ActiveBoostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    /**
     * Filter, which ActiveBoost to fetch.
     */
    where?: ActiveBoostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveBoosts to fetch.
     */
    orderBy?: ActiveBoostOrderByWithRelationInput | ActiveBoostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveBoosts.
     */
    cursor?: ActiveBoostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveBoosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveBoosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveBoosts.
     */
    distinct?: ActiveBoostScalarFieldEnum | ActiveBoostScalarFieldEnum[]
  }

  /**
   * ActiveBoost findFirstOrThrow
   */
  export type ActiveBoostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    /**
     * Filter, which ActiveBoost to fetch.
     */
    where?: ActiveBoostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveBoosts to fetch.
     */
    orderBy?: ActiveBoostOrderByWithRelationInput | ActiveBoostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveBoosts.
     */
    cursor?: ActiveBoostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveBoosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveBoosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveBoosts.
     */
    distinct?: ActiveBoostScalarFieldEnum | ActiveBoostScalarFieldEnum[]
  }

  /**
   * ActiveBoost findMany
   */
  export type ActiveBoostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    /**
     * Filter, which ActiveBoosts to fetch.
     */
    where?: ActiveBoostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveBoosts to fetch.
     */
    orderBy?: ActiveBoostOrderByWithRelationInput | ActiveBoostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActiveBoosts.
     */
    cursor?: ActiveBoostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveBoosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveBoosts.
     */
    skip?: number
    distinct?: ActiveBoostScalarFieldEnum | ActiveBoostScalarFieldEnum[]
  }

  /**
   * ActiveBoost create
   */
  export type ActiveBoostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    /**
     * The data needed to create a ActiveBoost.
     */
    data: XOR<ActiveBoostCreateInput, ActiveBoostUncheckedCreateInput>
  }

  /**
   * ActiveBoost createMany
   */
  export type ActiveBoostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActiveBoosts.
     */
    data: ActiveBoostCreateManyInput | ActiveBoostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActiveBoost createManyAndReturn
   */
  export type ActiveBoostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * The data used to create many ActiveBoosts.
     */
    data: ActiveBoostCreateManyInput | ActiveBoostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActiveBoost update
   */
  export type ActiveBoostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    /**
     * The data needed to update a ActiveBoost.
     */
    data: XOR<ActiveBoostUpdateInput, ActiveBoostUncheckedUpdateInput>
    /**
     * Choose, which ActiveBoost to update.
     */
    where: ActiveBoostWhereUniqueInput
  }

  /**
   * ActiveBoost updateMany
   */
  export type ActiveBoostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActiveBoosts.
     */
    data: XOR<ActiveBoostUpdateManyMutationInput, ActiveBoostUncheckedUpdateManyInput>
    /**
     * Filter which ActiveBoosts to update
     */
    where?: ActiveBoostWhereInput
    /**
     * Limit how many ActiveBoosts to update.
     */
    limit?: number
  }

  /**
   * ActiveBoost updateManyAndReturn
   */
  export type ActiveBoostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * The data used to update ActiveBoosts.
     */
    data: XOR<ActiveBoostUpdateManyMutationInput, ActiveBoostUncheckedUpdateManyInput>
    /**
     * Filter which ActiveBoosts to update
     */
    where?: ActiveBoostWhereInput
    /**
     * Limit how many ActiveBoosts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActiveBoost upsert
   */
  export type ActiveBoostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    /**
     * The filter to search for the ActiveBoost to update in case it exists.
     */
    where: ActiveBoostWhereUniqueInput
    /**
     * In case the ActiveBoost found by the `where` argument doesn't exist, create a new ActiveBoost with this data.
     */
    create: XOR<ActiveBoostCreateInput, ActiveBoostUncheckedCreateInput>
    /**
     * In case the ActiveBoost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActiveBoostUpdateInput, ActiveBoostUncheckedUpdateInput>
  }

  /**
   * ActiveBoost delete
   */
  export type ActiveBoostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
    /**
     * Filter which ActiveBoost to delete.
     */
    where: ActiveBoostWhereUniqueInput
  }

  /**
   * ActiveBoost deleteMany
   */
  export type ActiveBoostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveBoosts to delete
     */
    where?: ActiveBoostWhereInput
    /**
     * Limit how many ActiveBoosts to delete.
     */
    limit?: number
  }

  /**
   * ActiveBoost without action
   */
  export type ActiveBoostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveBoost
     */
    select?: ActiveBoostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveBoost
     */
    omit?: ActiveBoostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveBoostInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    sessionCode: 'sessionCode',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserSessionScalarFieldEnum: {
    id: 'id',
    xp: 'xp',
    money: 'money',
    joinedAt: 'joinedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    sessionId: 'sessionId'
  };

  export type UserSessionScalarFieldEnum = (typeof UserSessionScalarFieldEnum)[keyof typeof UserSessionScalarFieldEnum]


  export const AvailablePlayerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    team: 'team',
    position: 'position',
    price: 'price',
    stats: 'stats',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AvailablePlayerScalarFieldEnum = (typeof AvailablePlayerScalarFieldEnum)[keyof typeof AvailablePlayerScalarFieldEnum]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    xp: 'xp',
    team: 'team',
    position: 'position',
    active: 'active',
    statCategoryXp: 'statCategoryXp',
    boosts: 'boosts',
    userSessionId: 'userSessionId',
    availablePlayerId: 'availablePlayerId'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const BoostScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    multiplier: 'multiplier',
    duration: 'duration',
    cost: 'cost',
    boostType: 'boostType'
  };

  export type BoostScalarFieldEnum = (typeof BoostScalarFieldEnum)[keyof typeof BoostScalarFieldEnum]


  export const ActiveBoostScalarFieldEnum: {
    id: 'id',
    boostId: 'boostId',
    playerId: 'playerId',
    completed: 'completed',
    endTime: 'endTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userSessionId: 'userSessionId'
  };

  export type ActiveBoostScalarFieldEnum = (typeof ActiveBoostScalarFieldEnum)[keyof typeof ActiveBoostScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: UserSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: UserSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: UserSessionListRelationFilter
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    name?: StringFilter<"Session"> | string
    sessionCode?: StringFilter<"Session"> | string
    startTime?: DateTimeFilter<"Session"> | Date | string
    endTime?: DateTimeNullableFilter<"Session"> | Date | string | null
    status?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    userSessions?: UserSessionListRelationFilter
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    sessionCode?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userSessions?: UserSessionOrderByRelationAggregateInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionCode?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    name?: StringFilter<"Session"> | string
    startTime?: DateTimeFilter<"Session"> | Date | string
    endTime?: DateTimeNullableFilter<"Session"> | Date | string | null
    status?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    userSessions?: UserSessionListRelationFilter
  }, "id" | "sessionCode">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    sessionCode?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    name?: StringWithAggregatesFilter<"Session"> | string
    sessionCode?: StringWithAggregatesFilter<"Session"> | string
    startTime?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
    status?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type UserSessionWhereInput = {
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    id?: StringFilter<"UserSession"> | string
    xp?: IntFilter<"UserSession"> | number
    money?: IntFilter<"UserSession"> | number
    joinedAt?: DateTimeFilter<"UserSession"> | Date | string
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeFilter<"UserSession"> | Date | string
    userId?: StringFilter<"UserSession"> | string
    sessionId?: StringFilter<"UserSession"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
    players?: PlayerListRelationFilter
    activeBoosts?: ActiveBoostListRelationFilter
  }

  export type UserSessionOrderByWithRelationInput = {
    id?: SortOrder
    xp?: SortOrder
    money?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    user?: UserOrderByWithRelationInput
    session?: SessionOrderByWithRelationInput
    players?: PlayerOrderByRelationAggregateInput
    activeBoosts?: ActiveBoostOrderByRelationAggregateInput
  }

  export type UserSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_sessionId?: UserSessionUserIdSessionIdCompoundUniqueInput
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    xp?: IntFilter<"UserSession"> | number
    money?: IntFilter<"UserSession"> | number
    joinedAt?: DateTimeFilter<"UserSession"> | Date | string
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeFilter<"UserSession"> | Date | string
    userId?: StringFilter<"UserSession"> | string
    sessionId?: StringFilter<"UserSession"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
    players?: PlayerListRelationFilter
    activeBoosts?: ActiveBoostListRelationFilter
  }, "id" | "userId_sessionId">

  export type UserSessionOrderByWithAggregationInput = {
    id?: SortOrder
    xp?: SortOrder
    money?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    _count?: UserSessionCountOrderByAggregateInput
    _avg?: UserSessionAvgOrderByAggregateInput
    _max?: UserSessionMaxOrderByAggregateInput
    _min?: UserSessionMinOrderByAggregateInput
    _sum?: UserSessionSumOrderByAggregateInput
  }

  export type UserSessionScalarWhereWithAggregatesInput = {
    AND?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    OR?: UserSessionScalarWhereWithAggregatesInput[]
    NOT?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSession"> | string
    xp?: IntWithAggregatesFilter<"UserSession"> | number
    money?: IntWithAggregatesFilter<"UserSession"> | number
    joinedAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
    userId?: StringWithAggregatesFilter<"UserSession"> | string
    sessionId?: StringWithAggregatesFilter<"UserSession"> | string
  }

  export type AvailablePlayerWhereInput = {
    AND?: AvailablePlayerWhereInput | AvailablePlayerWhereInput[]
    OR?: AvailablePlayerWhereInput[]
    NOT?: AvailablePlayerWhereInput | AvailablePlayerWhereInput[]
    id?: StringFilter<"AvailablePlayer"> | string
    name?: StringFilter<"AvailablePlayer"> | string
    team?: StringFilter<"AvailablePlayer"> | string
    position?: StringFilter<"AvailablePlayer"> | string
    price?: IntFilter<"AvailablePlayer"> | number
    stats?: JsonFilter<"AvailablePlayer">
    createdAt?: DateTimeFilter<"AvailablePlayer"> | Date | string
    updatedAt?: DateTimeFilter<"AvailablePlayer"> | Date | string
    players?: PlayerListRelationFilter
  }

  export type AvailablePlayerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    team?: SortOrder
    position?: SortOrder
    price?: SortOrder
    stats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    players?: PlayerOrderByRelationAggregateInput
  }

  export type AvailablePlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AvailablePlayerWhereInput | AvailablePlayerWhereInput[]
    OR?: AvailablePlayerWhereInput[]
    NOT?: AvailablePlayerWhereInput | AvailablePlayerWhereInput[]
    name?: StringFilter<"AvailablePlayer"> | string
    team?: StringFilter<"AvailablePlayer"> | string
    position?: StringFilter<"AvailablePlayer"> | string
    price?: IntFilter<"AvailablePlayer"> | number
    stats?: JsonFilter<"AvailablePlayer">
    createdAt?: DateTimeFilter<"AvailablePlayer"> | Date | string
    updatedAt?: DateTimeFilter<"AvailablePlayer"> | Date | string
    players?: PlayerListRelationFilter
  }, "id">

  export type AvailablePlayerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    team?: SortOrder
    position?: SortOrder
    price?: SortOrder
    stats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AvailablePlayerCountOrderByAggregateInput
    _avg?: AvailablePlayerAvgOrderByAggregateInput
    _max?: AvailablePlayerMaxOrderByAggregateInput
    _min?: AvailablePlayerMinOrderByAggregateInput
    _sum?: AvailablePlayerSumOrderByAggregateInput
  }

  export type AvailablePlayerScalarWhereWithAggregatesInput = {
    AND?: AvailablePlayerScalarWhereWithAggregatesInput | AvailablePlayerScalarWhereWithAggregatesInput[]
    OR?: AvailablePlayerScalarWhereWithAggregatesInput[]
    NOT?: AvailablePlayerScalarWhereWithAggregatesInput | AvailablePlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AvailablePlayer"> | string
    name?: StringWithAggregatesFilter<"AvailablePlayer"> | string
    team?: StringWithAggregatesFilter<"AvailablePlayer"> | string
    position?: StringWithAggregatesFilter<"AvailablePlayer"> | string
    price?: IntWithAggregatesFilter<"AvailablePlayer"> | number
    stats?: JsonWithAggregatesFilter<"AvailablePlayer">
    createdAt?: DateTimeWithAggregatesFilter<"AvailablePlayer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AvailablePlayer"> | Date | string
  }

  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: StringFilter<"Player"> | string
    name?: StringFilter<"Player"> | string
    createdAt?: DateTimeFilter<"Player"> | Date | string
    updatedAt?: DateTimeFilter<"Player"> | Date | string
    xp?: IntFilter<"Player"> | number
    team?: StringFilter<"Player"> | string
    position?: StringFilter<"Player"> | string
    active?: BoolFilter<"Player"> | boolean
    statCategoryXp?: JsonFilter<"Player">
    boosts?: JsonFilter<"Player">
    userSessionId?: StringFilter<"Player"> | string
    availablePlayerId?: StringFilter<"Player"> | string
    userSession?: XOR<UserSessionScalarRelationFilter, UserSessionWhereInput>
    availablePlayer?: XOR<AvailablePlayerScalarRelationFilter, AvailablePlayerWhereInput>
    activeBoosts?: ActiveBoostListRelationFilter
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    xp?: SortOrder
    team?: SortOrder
    position?: SortOrder
    active?: SortOrder
    statCategoryXp?: SortOrder
    boosts?: SortOrder
    userSessionId?: SortOrder
    availablePlayerId?: SortOrder
    userSession?: UserSessionOrderByWithRelationInput
    availablePlayer?: AvailablePlayerOrderByWithRelationInput
    activeBoosts?: ActiveBoostOrderByRelationAggregateInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userSessionId_availablePlayerId?: PlayerUserSessionIdAvailablePlayerIdCompoundUniqueInput
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    name?: StringFilter<"Player"> | string
    createdAt?: DateTimeFilter<"Player"> | Date | string
    updatedAt?: DateTimeFilter<"Player"> | Date | string
    xp?: IntFilter<"Player"> | number
    team?: StringFilter<"Player"> | string
    position?: StringFilter<"Player"> | string
    active?: BoolFilter<"Player"> | boolean
    statCategoryXp?: JsonFilter<"Player">
    boosts?: JsonFilter<"Player">
    userSessionId?: StringFilter<"Player"> | string
    availablePlayerId?: StringFilter<"Player"> | string
    userSession?: XOR<UserSessionScalarRelationFilter, UserSessionWhereInput>
    availablePlayer?: XOR<AvailablePlayerScalarRelationFilter, AvailablePlayerWhereInput>
    activeBoosts?: ActiveBoostListRelationFilter
  }, "id" | "userSessionId_availablePlayerId">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    xp?: SortOrder
    team?: SortOrder
    position?: SortOrder
    active?: SortOrder
    statCategoryXp?: SortOrder
    boosts?: SortOrder
    userSessionId?: SortOrder
    availablePlayerId?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _avg?: PlayerAvgOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
    _sum?: PlayerSumOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Player"> | string
    name?: StringWithAggregatesFilter<"Player"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
    xp?: IntWithAggregatesFilter<"Player"> | number
    team?: StringWithAggregatesFilter<"Player"> | string
    position?: StringWithAggregatesFilter<"Player"> | string
    active?: BoolWithAggregatesFilter<"Player"> | boolean
    statCategoryXp?: JsonWithAggregatesFilter<"Player">
    boosts?: JsonWithAggregatesFilter<"Player">
    userSessionId?: StringWithAggregatesFilter<"Player"> | string
    availablePlayerId?: StringWithAggregatesFilter<"Player"> | string
  }

  export type BoostWhereInput = {
    AND?: BoostWhereInput | BoostWhereInput[]
    OR?: BoostWhereInput[]
    NOT?: BoostWhereInput | BoostWhereInput[]
    id?: StringFilter<"Boost"> | string
    name?: StringFilter<"Boost"> | string
    description?: StringFilter<"Boost"> | string
    multiplier?: FloatFilter<"Boost"> | number
    duration?: IntFilter<"Boost"> | number
    cost?: IntFilter<"Boost"> | number
    boostType?: StringFilter<"Boost"> | string
    activeBoosts?: ActiveBoostListRelationFilter
  }

  export type BoostOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    multiplier?: SortOrder
    duration?: SortOrder
    cost?: SortOrder
    boostType?: SortOrder
    activeBoosts?: ActiveBoostOrderByRelationAggregateInput
  }

  export type BoostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BoostWhereInput | BoostWhereInput[]
    OR?: BoostWhereInput[]
    NOT?: BoostWhereInput | BoostWhereInput[]
    name?: StringFilter<"Boost"> | string
    description?: StringFilter<"Boost"> | string
    multiplier?: FloatFilter<"Boost"> | number
    duration?: IntFilter<"Boost"> | number
    cost?: IntFilter<"Boost"> | number
    boostType?: StringFilter<"Boost"> | string
    activeBoosts?: ActiveBoostListRelationFilter
  }, "id">

  export type BoostOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    multiplier?: SortOrder
    duration?: SortOrder
    cost?: SortOrder
    boostType?: SortOrder
    _count?: BoostCountOrderByAggregateInput
    _avg?: BoostAvgOrderByAggregateInput
    _max?: BoostMaxOrderByAggregateInput
    _min?: BoostMinOrderByAggregateInput
    _sum?: BoostSumOrderByAggregateInput
  }

  export type BoostScalarWhereWithAggregatesInput = {
    AND?: BoostScalarWhereWithAggregatesInput | BoostScalarWhereWithAggregatesInput[]
    OR?: BoostScalarWhereWithAggregatesInput[]
    NOT?: BoostScalarWhereWithAggregatesInput | BoostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Boost"> | string
    name?: StringWithAggregatesFilter<"Boost"> | string
    description?: StringWithAggregatesFilter<"Boost"> | string
    multiplier?: FloatWithAggregatesFilter<"Boost"> | number
    duration?: IntWithAggregatesFilter<"Boost"> | number
    cost?: IntWithAggregatesFilter<"Boost"> | number
    boostType?: StringWithAggregatesFilter<"Boost"> | string
  }

  export type ActiveBoostWhereInput = {
    AND?: ActiveBoostWhereInput | ActiveBoostWhereInput[]
    OR?: ActiveBoostWhereInput[]
    NOT?: ActiveBoostWhereInput | ActiveBoostWhereInput[]
    id?: StringFilter<"ActiveBoost"> | string
    boostId?: StringFilter<"ActiveBoost"> | string
    playerId?: StringFilter<"ActiveBoost"> | string
    completed?: BoolFilter<"ActiveBoost"> | boolean
    endTime?: DateTimeNullableFilter<"ActiveBoost"> | Date | string | null
    createdAt?: DateTimeFilter<"ActiveBoost"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveBoost"> | Date | string
    userSessionId?: StringFilter<"ActiveBoost"> | string
    boost?: XOR<BoostScalarRelationFilter, BoostWhereInput>
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    userSession?: XOR<UserSessionScalarRelationFilter, UserSessionWhereInput>
  }

  export type ActiveBoostOrderByWithRelationInput = {
    id?: SortOrder
    boostId?: SortOrder
    playerId?: SortOrder
    completed?: SortOrder
    endTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userSessionId?: SortOrder
    boost?: BoostOrderByWithRelationInput
    player?: PlayerOrderByWithRelationInput
    userSession?: UserSessionOrderByWithRelationInput
  }

  export type ActiveBoostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActiveBoostWhereInput | ActiveBoostWhereInput[]
    OR?: ActiveBoostWhereInput[]
    NOT?: ActiveBoostWhereInput | ActiveBoostWhereInput[]
    boostId?: StringFilter<"ActiveBoost"> | string
    playerId?: StringFilter<"ActiveBoost"> | string
    completed?: BoolFilter<"ActiveBoost"> | boolean
    endTime?: DateTimeNullableFilter<"ActiveBoost"> | Date | string | null
    createdAt?: DateTimeFilter<"ActiveBoost"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveBoost"> | Date | string
    userSessionId?: StringFilter<"ActiveBoost"> | string
    boost?: XOR<BoostScalarRelationFilter, BoostWhereInput>
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    userSession?: XOR<UserSessionScalarRelationFilter, UserSessionWhereInput>
  }, "id">

  export type ActiveBoostOrderByWithAggregationInput = {
    id?: SortOrder
    boostId?: SortOrder
    playerId?: SortOrder
    completed?: SortOrder
    endTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userSessionId?: SortOrder
    _count?: ActiveBoostCountOrderByAggregateInput
    _max?: ActiveBoostMaxOrderByAggregateInput
    _min?: ActiveBoostMinOrderByAggregateInput
  }

  export type ActiveBoostScalarWhereWithAggregatesInput = {
    AND?: ActiveBoostScalarWhereWithAggregatesInput | ActiveBoostScalarWhereWithAggregatesInput[]
    OR?: ActiveBoostScalarWhereWithAggregatesInput[]
    NOT?: ActiveBoostScalarWhereWithAggregatesInput | ActiveBoostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActiveBoost"> | string
    boostId?: StringWithAggregatesFilter<"ActiveBoost"> | string
    playerId?: StringWithAggregatesFilter<"ActiveBoost"> | string
    completed?: BoolWithAggregatesFilter<"ActiveBoost"> | boolean
    endTime?: DateTimeNullableWithAggregatesFilter<"ActiveBoost"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActiveBoost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ActiveBoost"> | Date | string
    userSessionId?: StringWithAggregatesFilter<"ActiveBoost"> | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    name: string
    sessionCode: string
    startTime?: Date | string
    endTime?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userSessions?: UserSessionCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    name: string
    sessionCode: string
    startTime?: Date | string
    endTime?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userSessions?: UserSessionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessionCode?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessionCode?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessions?: UserSessionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: string
    name: string
    sessionCode: string
    startTime?: Date | string
    endTime?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessionCode?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessionCode?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionCreateInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
    session: SessionCreateNestedOneWithoutUserSessionsInput
    players?: PlayerCreateNestedManyWithoutUserSessionInput
    activeBoosts?: ActiveBoostCreateNestedManyWithoutUserSessionInput
  }

  export type UserSessionUncheckedCreateInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    sessionId: string
    players?: PlayerUncheckedCreateNestedManyWithoutUserSessionInput
    activeBoosts?: ActiveBoostUncheckedCreateNestedManyWithoutUserSessionInput
  }

  export type UserSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
    session?: SessionUpdateOneRequiredWithoutUserSessionsNestedInput
    players?: PlayerUpdateManyWithoutUserSessionNestedInput
    activeBoosts?: ActiveBoostUpdateManyWithoutUserSessionNestedInput
  }

  export type UserSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    players?: PlayerUncheckedUpdateManyWithoutUserSessionNestedInput
    activeBoosts?: ActiveBoostUncheckedUpdateManyWithoutUserSessionNestedInput
  }

  export type UserSessionCreateManyInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    sessionId: string
  }

  export type UserSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
  }

  export type AvailablePlayerCreateInput = {
    id?: string
    name: string
    team: string
    position: string
    price: number
    stats: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    players?: PlayerCreateNestedManyWithoutAvailablePlayerInput
  }

  export type AvailablePlayerUncheckedCreateInput = {
    id?: string
    name: string
    team: string
    position: string
    price: number
    stats: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    players?: PlayerUncheckedCreateNestedManyWithoutAvailablePlayerInput
  }

  export type AvailablePlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stats?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: PlayerUpdateManyWithoutAvailablePlayerNestedInput
  }

  export type AvailablePlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stats?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: PlayerUncheckedUpdateManyWithoutAvailablePlayerNestedInput
  }

  export type AvailablePlayerCreateManyInput = {
    id?: string
    name: string
    team: string
    position: string
    price: number
    stats: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailablePlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stats?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailablePlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stats?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    userSession: UserSessionCreateNestedOneWithoutPlayersInput
    availablePlayer: AvailablePlayerCreateNestedOneWithoutPlayersInput
    activeBoosts?: ActiveBoostCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    userSessionId: string
    availablePlayerId: string
    activeBoosts?: ActiveBoostUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    userSession?: UserSessionUpdateOneRequiredWithoutPlayersNestedInput
    availablePlayer?: AvailablePlayerUpdateOneRequiredWithoutPlayersNestedInput
    activeBoosts?: ActiveBoostUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    userSessionId?: StringFieldUpdateOperationsInput | string
    availablePlayerId?: StringFieldUpdateOperationsInput | string
    activeBoosts?: ActiveBoostUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    userSessionId: string
    availablePlayerId: string
  }

  export type PlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    userSessionId?: StringFieldUpdateOperationsInput | string
    availablePlayerId?: StringFieldUpdateOperationsInput | string
  }

  export type BoostCreateInput = {
    id?: string
    name: string
    description: string
    multiplier: number
    duration: number
    cost: number
    boostType: string
    activeBoosts?: ActiveBoostCreateNestedManyWithoutBoostInput
  }

  export type BoostUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    multiplier: number
    duration: number
    cost: number
    boostType: string
    activeBoosts?: ActiveBoostUncheckedCreateNestedManyWithoutBoostInput
  }

  export type BoostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    multiplier?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cost?: IntFieldUpdateOperationsInput | number
    boostType?: StringFieldUpdateOperationsInput | string
    activeBoosts?: ActiveBoostUpdateManyWithoutBoostNestedInput
  }

  export type BoostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    multiplier?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cost?: IntFieldUpdateOperationsInput | number
    boostType?: StringFieldUpdateOperationsInput | string
    activeBoosts?: ActiveBoostUncheckedUpdateManyWithoutBoostNestedInput
  }

  export type BoostCreateManyInput = {
    id?: string
    name: string
    description: string
    multiplier: number
    duration: number
    cost: number
    boostType: string
  }

  export type BoostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    multiplier?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cost?: IntFieldUpdateOperationsInput | number
    boostType?: StringFieldUpdateOperationsInput | string
  }

  export type BoostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    multiplier?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cost?: IntFieldUpdateOperationsInput | number
    boostType?: StringFieldUpdateOperationsInput | string
  }

  export type ActiveBoostCreateInput = {
    id?: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    boost: BoostCreateNestedOneWithoutActiveBoostsInput
    player: PlayerCreateNestedOneWithoutActiveBoostsInput
    userSession: UserSessionCreateNestedOneWithoutActiveBoostsInput
  }

  export type ActiveBoostUncheckedCreateInput = {
    id?: string
    boostId: string
    playerId: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userSessionId: string
  }

  export type ActiveBoostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    boost?: BoostUpdateOneRequiredWithoutActiveBoostsNestedInput
    player?: PlayerUpdateOneRequiredWithoutActiveBoostsNestedInput
    userSession?: UserSessionUpdateOneRequiredWithoutActiveBoostsNestedInput
  }

  export type ActiveBoostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    boostId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ActiveBoostCreateManyInput = {
    id?: string
    boostId: string
    playerId: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userSessionId: string
  }

  export type ActiveBoostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveBoostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    boostId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserSessionListRelationFilter = {
    every?: UserSessionWhereInput
    some?: UserSessionWhereInput
    none?: UserSessionWhereInput
  }

  export type UserSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sessionCode?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sessionCode?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sessionCode?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionScalarRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type PlayerListRelationFilter = {
    every?: PlayerWhereInput
    some?: PlayerWhereInput
    none?: PlayerWhereInput
  }

  export type ActiveBoostListRelationFilter = {
    every?: ActiveBoostWhereInput
    some?: ActiveBoostWhereInput
    none?: ActiveBoostWhereInput
  }

  export type PlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActiveBoostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserSessionUserIdSessionIdCompoundUniqueInput = {
    userId: string
    sessionId: string
  }

  export type UserSessionCountOrderByAggregateInput = {
    id?: SortOrder
    xp?: SortOrder
    money?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
  }

  export type UserSessionAvgOrderByAggregateInput = {
    xp?: SortOrder
    money?: SortOrder
  }

  export type UserSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    xp?: SortOrder
    money?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
  }

  export type UserSessionMinOrderByAggregateInput = {
    id?: SortOrder
    xp?: SortOrder
    money?: SortOrder
    joinedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
  }

  export type UserSessionSumOrderByAggregateInput = {
    xp?: SortOrder
    money?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AvailablePlayerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    team?: SortOrder
    position?: SortOrder
    price?: SortOrder
    stats?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailablePlayerAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type AvailablePlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    team?: SortOrder
    position?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailablePlayerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    team?: SortOrder
    position?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AvailablePlayerSumOrderByAggregateInput = {
    price?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserSessionScalarRelationFilter = {
    is?: UserSessionWhereInput
    isNot?: UserSessionWhereInput
  }

  export type AvailablePlayerScalarRelationFilter = {
    is?: AvailablePlayerWhereInput
    isNot?: AvailablePlayerWhereInput
  }

  export type PlayerUserSessionIdAvailablePlayerIdCompoundUniqueInput = {
    userSessionId: string
    availablePlayerId: string
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    xp?: SortOrder
    team?: SortOrder
    position?: SortOrder
    active?: SortOrder
    statCategoryXp?: SortOrder
    boosts?: SortOrder
    userSessionId?: SortOrder
    availablePlayerId?: SortOrder
  }

  export type PlayerAvgOrderByAggregateInput = {
    xp?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    xp?: SortOrder
    team?: SortOrder
    position?: SortOrder
    active?: SortOrder
    userSessionId?: SortOrder
    availablePlayerId?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    xp?: SortOrder
    team?: SortOrder
    position?: SortOrder
    active?: SortOrder
    userSessionId?: SortOrder
    availablePlayerId?: SortOrder
  }

  export type PlayerSumOrderByAggregateInput = {
    xp?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoostCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    multiplier?: SortOrder
    duration?: SortOrder
    cost?: SortOrder
    boostType?: SortOrder
  }

  export type BoostAvgOrderByAggregateInput = {
    multiplier?: SortOrder
    duration?: SortOrder
    cost?: SortOrder
  }

  export type BoostMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    multiplier?: SortOrder
    duration?: SortOrder
    cost?: SortOrder
    boostType?: SortOrder
  }

  export type BoostMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    multiplier?: SortOrder
    duration?: SortOrder
    cost?: SortOrder
    boostType?: SortOrder
  }

  export type BoostSumOrderByAggregateInput = {
    multiplier?: SortOrder
    duration?: SortOrder
    cost?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoostScalarRelationFilter = {
    is?: BoostWhereInput
    isNot?: BoostWhereInput
  }

  export type PlayerScalarRelationFilter = {
    is?: PlayerWhereInput
    isNot?: PlayerWhereInput
  }

  export type ActiveBoostCountOrderByAggregateInput = {
    id?: SortOrder
    boostId?: SortOrder
    playerId?: SortOrder
    completed?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userSessionId?: SortOrder
  }

  export type ActiveBoostMaxOrderByAggregateInput = {
    id?: SortOrder
    boostId?: SortOrder
    playerId?: SortOrder
    completed?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userSessionId?: SortOrder
  }

  export type ActiveBoostMinOrderByAggregateInput = {
    id?: SortOrder
    boostId?: SortOrder
    playerId?: SortOrder
    completed?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userSessionId?: SortOrder
  }

  export type UserSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type UserSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutUserInput | UserSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutUserInput | UserSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutUserInput | UserSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type UserSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutUserInput | UserSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutUserInput | UserSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutUserInput | UserSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type UserSessionCreateNestedManyWithoutSessionInput = {
    create?: XOR<UserSessionCreateWithoutSessionInput, UserSessionUncheckedCreateWithoutSessionInput> | UserSessionCreateWithoutSessionInput[] | UserSessionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutSessionInput | UserSessionCreateOrConnectWithoutSessionInput[]
    createMany?: UserSessionCreateManySessionInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type UserSessionUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<UserSessionCreateWithoutSessionInput, UserSessionUncheckedCreateWithoutSessionInput> | UserSessionCreateWithoutSessionInput[] | UserSessionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutSessionInput | UserSessionCreateOrConnectWithoutSessionInput[]
    createMany?: UserSessionCreateManySessionInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserSessionUpdateManyWithoutSessionNestedInput = {
    create?: XOR<UserSessionCreateWithoutSessionInput, UserSessionUncheckedCreateWithoutSessionInput> | UserSessionCreateWithoutSessionInput[] | UserSessionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutSessionInput | UserSessionCreateOrConnectWithoutSessionInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutSessionInput | UserSessionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: UserSessionCreateManySessionInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutSessionInput | UserSessionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutSessionInput | UserSessionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type UserSessionUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<UserSessionCreateWithoutSessionInput, UserSessionUncheckedCreateWithoutSessionInput> | UserSessionCreateWithoutSessionInput[] | UserSessionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutSessionInput | UserSessionCreateOrConnectWithoutSessionInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutSessionInput | UserSessionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: UserSessionCreateManySessionInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutSessionInput | UserSessionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutSessionInput | UserSessionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type SessionCreateNestedOneWithoutUserSessionsInput = {
    create?: XOR<SessionCreateWithoutUserSessionsInput, SessionUncheckedCreateWithoutUserSessionsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutUserSessionsInput
    connect?: SessionWhereUniqueInput
  }

  export type PlayerCreateNestedManyWithoutUserSessionInput = {
    create?: XOR<PlayerCreateWithoutUserSessionInput, PlayerUncheckedCreateWithoutUserSessionInput> | PlayerCreateWithoutUserSessionInput[] | PlayerUncheckedCreateWithoutUserSessionInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutUserSessionInput | PlayerCreateOrConnectWithoutUserSessionInput[]
    createMany?: PlayerCreateManyUserSessionInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type ActiveBoostCreateNestedManyWithoutUserSessionInput = {
    create?: XOR<ActiveBoostCreateWithoutUserSessionInput, ActiveBoostUncheckedCreateWithoutUserSessionInput> | ActiveBoostCreateWithoutUserSessionInput[] | ActiveBoostUncheckedCreateWithoutUserSessionInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutUserSessionInput | ActiveBoostCreateOrConnectWithoutUserSessionInput[]
    createMany?: ActiveBoostCreateManyUserSessionInputEnvelope
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
  }

  export type PlayerUncheckedCreateNestedManyWithoutUserSessionInput = {
    create?: XOR<PlayerCreateWithoutUserSessionInput, PlayerUncheckedCreateWithoutUserSessionInput> | PlayerCreateWithoutUserSessionInput[] | PlayerUncheckedCreateWithoutUserSessionInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutUserSessionInput | PlayerCreateOrConnectWithoutUserSessionInput[]
    createMany?: PlayerCreateManyUserSessionInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type ActiveBoostUncheckedCreateNestedManyWithoutUserSessionInput = {
    create?: XOR<ActiveBoostCreateWithoutUserSessionInput, ActiveBoostUncheckedCreateWithoutUserSessionInput> | ActiveBoostCreateWithoutUserSessionInput[] | ActiveBoostUncheckedCreateWithoutUserSessionInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutUserSessionInput | ActiveBoostCreateOrConnectWithoutUserSessionInput[]
    createMany?: ActiveBoostCreateManyUserSessionInputEnvelope
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type SessionUpdateOneRequiredWithoutUserSessionsNestedInput = {
    create?: XOR<SessionCreateWithoutUserSessionsInput, SessionUncheckedCreateWithoutUserSessionsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutUserSessionsInput
    upsert?: SessionUpsertWithoutUserSessionsInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutUserSessionsInput, SessionUpdateWithoutUserSessionsInput>, SessionUncheckedUpdateWithoutUserSessionsInput>
  }

  export type PlayerUpdateManyWithoutUserSessionNestedInput = {
    create?: XOR<PlayerCreateWithoutUserSessionInput, PlayerUncheckedCreateWithoutUserSessionInput> | PlayerCreateWithoutUserSessionInput[] | PlayerUncheckedCreateWithoutUserSessionInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutUserSessionInput | PlayerCreateOrConnectWithoutUserSessionInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutUserSessionInput | PlayerUpsertWithWhereUniqueWithoutUserSessionInput[]
    createMany?: PlayerCreateManyUserSessionInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutUserSessionInput | PlayerUpdateWithWhereUniqueWithoutUserSessionInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutUserSessionInput | PlayerUpdateManyWithWhereWithoutUserSessionInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type ActiveBoostUpdateManyWithoutUserSessionNestedInput = {
    create?: XOR<ActiveBoostCreateWithoutUserSessionInput, ActiveBoostUncheckedCreateWithoutUserSessionInput> | ActiveBoostCreateWithoutUserSessionInput[] | ActiveBoostUncheckedCreateWithoutUserSessionInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutUserSessionInput | ActiveBoostCreateOrConnectWithoutUserSessionInput[]
    upsert?: ActiveBoostUpsertWithWhereUniqueWithoutUserSessionInput | ActiveBoostUpsertWithWhereUniqueWithoutUserSessionInput[]
    createMany?: ActiveBoostCreateManyUserSessionInputEnvelope
    set?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    disconnect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    delete?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    update?: ActiveBoostUpdateWithWhereUniqueWithoutUserSessionInput | ActiveBoostUpdateWithWhereUniqueWithoutUserSessionInput[]
    updateMany?: ActiveBoostUpdateManyWithWhereWithoutUserSessionInput | ActiveBoostUpdateManyWithWhereWithoutUserSessionInput[]
    deleteMany?: ActiveBoostScalarWhereInput | ActiveBoostScalarWhereInput[]
  }

  export type PlayerUncheckedUpdateManyWithoutUserSessionNestedInput = {
    create?: XOR<PlayerCreateWithoutUserSessionInput, PlayerUncheckedCreateWithoutUserSessionInput> | PlayerCreateWithoutUserSessionInput[] | PlayerUncheckedCreateWithoutUserSessionInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutUserSessionInput | PlayerCreateOrConnectWithoutUserSessionInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutUserSessionInput | PlayerUpsertWithWhereUniqueWithoutUserSessionInput[]
    createMany?: PlayerCreateManyUserSessionInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutUserSessionInput | PlayerUpdateWithWhereUniqueWithoutUserSessionInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutUserSessionInput | PlayerUpdateManyWithWhereWithoutUserSessionInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type ActiveBoostUncheckedUpdateManyWithoutUserSessionNestedInput = {
    create?: XOR<ActiveBoostCreateWithoutUserSessionInput, ActiveBoostUncheckedCreateWithoutUserSessionInput> | ActiveBoostCreateWithoutUserSessionInput[] | ActiveBoostUncheckedCreateWithoutUserSessionInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutUserSessionInput | ActiveBoostCreateOrConnectWithoutUserSessionInput[]
    upsert?: ActiveBoostUpsertWithWhereUniqueWithoutUserSessionInput | ActiveBoostUpsertWithWhereUniqueWithoutUserSessionInput[]
    createMany?: ActiveBoostCreateManyUserSessionInputEnvelope
    set?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    disconnect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    delete?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    update?: ActiveBoostUpdateWithWhereUniqueWithoutUserSessionInput | ActiveBoostUpdateWithWhereUniqueWithoutUserSessionInput[]
    updateMany?: ActiveBoostUpdateManyWithWhereWithoutUserSessionInput | ActiveBoostUpdateManyWithWhereWithoutUserSessionInput[]
    deleteMany?: ActiveBoostScalarWhereInput | ActiveBoostScalarWhereInput[]
  }

  export type PlayerCreateNestedManyWithoutAvailablePlayerInput = {
    create?: XOR<PlayerCreateWithoutAvailablePlayerInput, PlayerUncheckedCreateWithoutAvailablePlayerInput> | PlayerCreateWithoutAvailablePlayerInput[] | PlayerUncheckedCreateWithoutAvailablePlayerInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutAvailablePlayerInput | PlayerCreateOrConnectWithoutAvailablePlayerInput[]
    createMany?: PlayerCreateManyAvailablePlayerInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type PlayerUncheckedCreateNestedManyWithoutAvailablePlayerInput = {
    create?: XOR<PlayerCreateWithoutAvailablePlayerInput, PlayerUncheckedCreateWithoutAvailablePlayerInput> | PlayerCreateWithoutAvailablePlayerInput[] | PlayerUncheckedCreateWithoutAvailablePlayerInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutAvailablePlayerInput | PlayerCreateOrConnectWithoutAvailablePlayerInput[]
    createMany?: PlayerCreateManyAvailablePlayerInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type PlayerUpdateManyWithoutAvailablePlayerNestedInput = {
    create?: XOR<PlayerCreateWithoutAvailablePlayerInput, PlayerUncheckedCreateWithoutAvailablePlayerInput> | PlayerCreateWithoutAvailablePlayerInput[] | PlayerUncheckedCreateWithoutAvailablePlayerInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutAvailablePlayerInput | PlayerCreateOrConnectWithoutAvailablePlayerInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutAvailablePlayerInput | PlayerUpsertWithWhereUniqueWithoutAvailablePlayerInput[]
    createMany?: PlayerCreateManyAvailablePlayerInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutAvailablePlayerInput | PlayerUpdateWithWhereUniqueWithoutAvailablePlayerInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutAvailablePlayerInput | PlayerUpdateManyWithWhereWithoutAvailablePlayerInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type PlayerUncheckedUpdateManyWithoutAvailablePlayerNestedInput = {
    create?: XOR<PlayerCreateWithoutAvailablePlayerInput, PlayerUncheckedCreateWithoutAvailablePlayerInput> | PlayerCreateWithoutAvailablePlayerInput[] | PlayerUncheckedCreateWithoutAvailablePlayerInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutAvailablePlayerInput | PlayerCreateOrConnectWithoutAvailablePlayerInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutAvailablePlayerInput | PlayerUpsertWithWhereUniqueWithoutAvailablePlayerInput[]
    createMany?: PlayerCreateManyAvailablePlayerInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutAvailablePlayerInput | PlayerUpdateWithWhereUniqueWithoutAvailablePlayerInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutAvailablePlayerInput | PlayerUpdateManyWithWhereWithoutAvailablePlayerInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type UserSessionCreateNestedOneWithoutPlayersInput = {
    create?: XOR<UserSessionCreateWithoutPlayersInput, UserSessionUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: UserSessionCreateOrConnectWithoutPlayersInput
    connect?: UserSessionWhereUniqueInput
  }

  export type AvailablePlayerCreateNestedOneWithoutPlayersInput = {
    create?: XOR<AvailablePlayerCreateWithoutPlayersInput, AvailablePlayerUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: AvailablePlayerCreateOrConnectWithoutPlayersInput
    connect?: AvailablePlayerWhereUniqueInput
  }

  export type ActiveBoostCreateNestedManyWithoutPlayerInput = {
    create?: XOR<ActiveBoostCreateWithoutPlayerInput, ActiveBoostUncheckedCreateWithoutPlayerInput> | ActiveBoostCreateWithoutPlayerInput[] | ActiveBoostUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutPlayerInput | ActiveBoostCreateOrConnectWithoutPlayerInput[]
    createMany?: ActiveBoostCreateManyPlayerInputEnvelope
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
  }

  export type ActiveBoostUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<ActiveBoostCreateWithoutPlayerInput, ActiveBoostUncheckedCreateWithoutPlayerInput> | ActiveBoostCreateWithoutPlayerInput[] | ActiveBoostUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutPlayerInput | ActiveBoostCreateOrConnectWithoutPlayerInput[]
    createMany?: ActiveBoostCreateManyPlayerInputEnvelope
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserSessionUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<UserSessionCreateWithoutPlayersInput, UserSessionUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: UserSessionCreateOrConnectWithoutPlayersInput
    upsert?: UserSessionUpsertWithoutPlayersInput
    connect?: UserSessionWhereUniqueInput
    update?: XOR<XOR<UserSessionUpdateToOneWithWhereWithoutPlayersInput, UserSessionUpdateWithoutPlayersInput>, UserSessionUncheckedUpdateWithoutPlayersInput>
  }

  export type AvailablePlayerUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<AvailablePlayerCreateWithoutPlayersInput, AvailablePlayerUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: AvailablePlayerCreateOrConnectWithoutPlayersInput
    upsert?: AvailablePlayerUpsertWithoutPlayersInput
    connect?: AvailablePlayerWhereUniqueInput
    update?: XOR<XOR<AvailablePlayerUpdateToOneWithWhereWithoutPlayersInput, AvailablePlayerUpdateWithoutPlayersInput>, AvailablePlayerUncheckedUpdateWithoutPlayersInput>
  }

  export type ActiveBoostUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<ActiveBoostCreateWithoutPlayerInput, ActiveBoostUncheckedCreateWithoutPlayerInput> | ActiveBoostCreateWithoutPlayerInput[] | ActiveBoostUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutPlayerInput | ActiveBoostCreateOrConnectWithoutPlayerInput[]
    upsert?: ActiveBoostUpsertWithWhereUniqueWithoutPlayerInput | ActiveBoostUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: ActiveBoostCreateManyPlayerInputEnvelope
    set?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    disconnect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    delete?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    update?: ActiveBoostUpdateWithWhereUniqueWithoutPlayerInput | ActiveBoostUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: ActiveBoostUpdateManyWithWhereWithoutPlayerInput | ActiveBoostUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: ActiveBoostScalarWhereInput | ActiveBoostScalarWhereInput[]
  }

  export type ActiveBoostUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<ActiveBoostCreateWithoutPlayerInput, ActiveBoostUncheckedCreateWithoutPlayerInput> | ActiveBoostCreateWithoutPlayerInput[] | ActiveBoostUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutPlayerInput | ActiveBoostCreateOrConnectWithoutPlayerInput[]
    upsert?: ActiveBoostUpsertWithWhereUniqueWithoutPlayerInput | ActiveBoostUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: ActiveBoostCreateManyPlayerInputEnvelope
    set?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    disconnect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    delete?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    update?: ActiveBoostUpdateWithWhereUniqueWithoutPlayerInput | ActiveBoostUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: ActiveBoostUpdateManyWithWhereWithoutPlayerInput | ActiveBoostUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: ActiveBoostScalarWhereInput | ActiveBoostScalarWhereInput[]
  }

  export type ActiveBoostCreateNestedManyWithoutBoostInput = {
    create?: XOR<ActiveBoostCreateWithoutBoostInput, ActiveBoostUncheckedCreateWithoutBoostInput> | ActiveBoostCreateWithoutBoostInput[] | ActiveBoostUncheckedCreateWithoutBoostInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutBoostInput | ActiveBoostCreateOrConnectWithoutBoostInput[]
    createMany?: ActiveBoostCreateManyBoostInputEnvelope
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
  }

  export type ActiveBoostUncheckedCreateNestedManyWithoutBoostInput = {
    create?: XOR<ActiveBoostCreateWithoutBoostInput, ActiveBoostUncheckedCreateWithoutBoostInput> | ActiveBoostCreateWithoutBoostInput[] | ActiveBoostUncheckedCreateWithoutBoostInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutBoostInput | ActiveBoostCreateOrConnectWithoutBoostInput[]
    createMany?: ActiveBoostCreateManyBoostInputEnvelope
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ActiveBoostUpdateManyWithoutBoostNestedInput = {
    create?: XOR<ActiveBoostCreateWithoutBoostInput, ActiveBoostUncheckedCreateWithoutBoostInput> | ActiveBoostCreateWithoutBoostInput[] | ActiveBoostUncheckedCreateWithoutBoostInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutBoostInput | ActiveBoostCreateOrConnectWithoutBoostInput[]
    upsert?: ActiveBoostUpsertWithWhereUniqueWithoutBoostInput | ActiveBoostUpsertWithWhereUniqueWithoutBoostInput[]
    createMany?: ActiveBoostCreateManyBoostInputEnvelope
    set?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    disconnect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    delete?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    update?: ActiveBoostUpdateWithWhereUniqueWithoutBoostInput | ActiveBoostUpdateWithWhereUniqueWithoutBoostInput[]
    updateMany?: ActiveBoostUpdateManyWithWhereWithoutBoostInput | ActiveBoostUpdateManyWithWhereWithoutBoostInput[]
    deleteMany?: ActiveBoostScalarWhereInput | ActiveBoostScalarWhereInput[]
  }

  export type ActiveBoostUncheckedUpdateManyWithoutBoostNestedInput = {
    create?: XOR<ActiveBoostCreateWithoutBoostInput, ActiveBoostUncheckedCreateWithoutBoostInput> | ActiveBoostCreateWithoutBoostInput[] | ActiveBoostUncheckedCreateWithoutBoostInput[]
    connectOrCreate?: ActiveBoostCreateOrConnectWithoutBoostInput | ActiveBoostCreateOrConnectWithoutBoostInput[]
    upsert?: ActiveBoostUpsertWithWhereUniqueWithoutBoostInput | ActiveBoostUpsertWithWhereUniqueWithoutBoostInput[]
    createMany?: ActiveBoostCreateManyBoostInputEnvelope
    set?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    disconnect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    delete?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    connect?: ActiveBoostWhereUniqueInput | ActiveBoostWhereUniqueInput[]
    update?: ActiveBoostUpdateWithWhereUniqueWithoutBoostInput | ActiveBoostUpdateWithWhereUniqueWithoutBoostInput[]
    updateMany?: ActiveBoostUpdateManyWithWhereWithoutBoostInput | ActiveBoostUpdateManyWithWhereWithoutBoostInput[]
    deleteMany?: ActiveBoostScalarWhereInput | ActiveBoostScalarWhereInput[]
  }

  export type BoostCreateNestedOneWithoutActiveBoostsInput = {
    create?: XOR<BoostCreateWithoutActiveBoostsInput, BoostUncheckedCreateWithoutActiveBoostsInput>
    connectOrCreate?: BoostCreateOrConnectWithoutActiveBoostsInput
    connect?: BoostWhereUniqueInput
  }

  export type PlayerCreateNestedOneWithoutActiveBoostsInput = {
    create?: XOR<PlayerCreateWithoutActiveBoostsInput, PlayerUncheckedCreateWithoutActiveBoostsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutActiveBoostsInput
    connect?: PlayerWhereUniqueInput
  }

  export type UserSessionCreateNestedOneWithoutActiveBoostsInput = {
    create?: XOR<UserSessionCreateWithoutActiveBoostsInput, UserSessionUncheckedCreateWithoutActiveBoostsInput>
    connectOrCreate?: UserSessionCreateOrConnectWithoutActiveBoostsInput
    connect?: UserSessionWhereUniqueInput
  }

  export type BoostUpdateOneRequiredWithoutActiveBoostsNestedInput = {
    create?: XOR<BoostCreateWithoutActiveBoostsInput, BoostUncheckedCreateWithoutActiveBoostsInput>
    connectOrCreate?: BoostCreateOrConnectWithoutActiveBoostsInput
    upsert?: BoostUpsertWithoutActiveBoostsInput
    connect?: BoostWhereUniqueInput
    update?: XOR<XOR<BoostUpdateToOneWithWhereWithoutActiveBoostsInput, BoostUpdateWithoutActiveBoostsInput>, BoostUncheckedUpdateWithoutActiveBoostsInput>
  }

  export type PlayerUpdateOneRequiredWithoutActiveBoostsNestedInput = {
    create?: XOR<PlayerCreateWithoutActiveBoostsInput, PlayerUncheckedCreateWithoutActiveBoostsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutActiveBoostsInput
    upsert?: PlayerUpsertWithoutActiveBoostsInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutActiveBoostsInput, PlayerUpdateWithoutActiveBoostsInput>, PlayerUncheckedUpdateWithoutActiveBoostsInput>
  }

  export type UserSessionUpdateOneRequiredWithoutActiveBoostsNestedInput = {
    create?: XOR<UserSessionCreateWithoutActiveBoostsInput, UserSessionUncheckedCreateWithoutActiveBoostsInput>
    connectOrCreate?: UserSessionCreateOrConnectWithoutActiveBoostsInput
    upsert?: UserSessionUpsertWithoutActiveBoostsInput
    connect?: UserSessionWhereUniqueInput
    update?: XOR<XOR<UserSessionUpdateToOneWithWhereWithoutActiveBoostsInput, UserSessionUpdateWithoutActiveBoostsInput>, UserSessionUncheckedUpdateWithoutActiveBoostsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UserSessionCreateWithoutUserInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    session: SessionCreateNestedOneWithoutUserSessionsInput
    players?: PlayerCreateNestedManyWithoutUserSessionInput
    activeBoosts?: ActiveBoostCreateNestedManyWithoutUserSessionInput
  }

  export type UserSessionUncheckedCreateWithoutUserInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionId: string
    players?: PlayerUncheckedCreateNestedManyWithoutUserSessionInput
    activeBoosts?: ActiveBoostUncheckedCreateNestedManyWithoutUserSessionInput
  }

  export type UserSessionCreateOrConnectWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type UserSessionCreateManyUserInputEnvelope = {
    data: UserSessionCreateManyUserInput | UserSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    update: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type UserSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    data: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUpdateManyWithWhereWithoutUserInput = {
    where: UserSessionScalarWhereInput
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserSessionScalarWhereInput = {
    AND?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
    OR?: UserSessionScalarWhereInput[]
    NOT?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
    id?: StringFilter<"UserSession"> | string
    xp?: IntFilter<"UserSession"> | number
    money?: IntFilter<"UserSession"> | number
    joinedAt?: DateTimeFilter<"UserSession"> | Date | string
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    updatedAt?: DateTimeFilter<"UserSession"> | Date | string
    userId?: StringFilter<"UserSession"> | string
    sessionId?: StringFilter<"UserSession"> | string
  }

  export type UserSessionCreateWithoutSessionInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
    players?: PlayerCreateNestedManyWithoutUserSessionInput
    activeBoosts?: ActiveBoostCreateNestedManyWithoutUserSessionInput
  }

  export type UserSessionUncheckedCreateWithoutSessionInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    players?: PlayerUncheckedCreateNestedManyWithoutUserSessionInput
    activeBoosts?: ActiveBoostUncheckedCreateNestedManyWithoutUserSessionInput
  }

  export type UserSessionCreateOrConnectWithoutSessionInput = {
    where: UserSessionWhereUniqueInput
    create: XOR<UserSessionCreateWithoutSessionInput, UserSessionUncheckedCreateWithoutSessionInput>
  }

  export type UserSessionCreateManySessionInputEnvelope = {
    data: UserSessionCreateManySessionInput | UserSessionCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type UserSessionUpsertWithWhereUniqueWithoutSessionInput = {
    where: UserSessionWhereUniqueInput
    update: XOR<UserSessionUpdateWithoutSessionInput, UserSessionUncheckedUpdateWithoutSessionInput>
    create: XOR<UserSessionCreateWithoutSessionInput, UserSessionUncheckedCreateWithoutSessionInput>
  }

  export type UserSessionUpdateWithWhereUniqueWithoutSessionInput = {
    where: UserSessionWhereUniqueInput
    data: XOR<UserSessionUpdateWithoutSessionInput, UserSessionUncheckedUpdateWithoutSessionInput>
  }

  export type UserSessionUpdateManyWithWhereWithoutSessionInput = {
    where: UserSessionScalarWhereInput
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyWithoutSessionInput>
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type SessionCreateWithoutUserSessionsInput = {
    id?: string
    name: string
    sessionCode: string
    startTime?: Date | string
    endTime?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserSessionsInput = {
    id?: string
    name: string
    sessionCode: string
    startTime?: Date | string
    endTime?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserSessionsInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserSessionsInput, SessionUncheckedCreateWithoutUserSessionsInput>
  }

  export type PlayerCreateWithoutUserSessionInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    availablePlayer: AvailablePlayerCreateNestedOneWithoutPlayersInput
    activeBoosts?: ActiveBoostCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateWithoutUserSessionInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    availablePlayerId: string
    activeBoosts?: ActiveBoostUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerCreateOrConnectWithoutUserSessionInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutUserSessionInput, PlayerUncheckedCreateWithoutUserSessionInput>
  }

  export type PlayerCreateManyUserSessionInputEnvelope = {
    data: PlayerCreateManyUserSessionInput | PlayerCreateManyUserSessionInput[]
    skipDuplicates?: boolean
  }

  export type ActiveBoostCreateWithoutUserSessionInput = {
    id?: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    boost: BoostCreateNestedOneWithoutActiveBoostsInput
    player: PlayerCreateNestedOneWithoutActiveBoostsInput
  }

  export type ActiveBoostUncheckedCreateWithoutUserSessionInput = {
    id?: string
    boostId: string
    playerId: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveBoostCreateOrConnectWithoutUserSessionInput = {
    where: ActiveBoostWhereUniqueInput
    create: XOR<ActiveBoostCreateWithoutUserSessionInput, ActiveBoostUncheckedCreateWithoutUserSessionInput>
  }

  export type ActiveBoostCreateManyUserSessionInputEnvelope = {
    data: ActiveBoostCreateManyUserSessionInput | ActiveBoostCreateManyUserSessionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpsertWithoutUserSessionsInput = {
    update: XOR<SessionUpdateWithoutUserSessionsInput, SessionUncheckedUpdateWithoutUserSessionsInput>
    create: XOR<SessionCreateWithoutUserSessionsInput, SessionUncheckedCreateWithoutUserSessionsInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutUserSessionsInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutUserSessionsInput, SessionUncheckedUpdateWithoutUserSessionsInput>
  }

  export type SessionUpdateWithoutUserSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessionCode?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessionCode?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUpsertWithWhereUniqueWithoutUserSessionInput = {
    where: PlayerWhereUniqueInput
    update: XOR<PlayerUpdateWithoutUserSessionInput, PlayerUncheckedUpdateWithoutUserSessionInput>
    create: XOR<PlayerCreateWithoutUserSessionInput, PlayerUncheckedCreateWithoutUserSessionInput>
  }

  export type PlayerUpdateWithWhereUniqueWithoutUserSessionInput = {
    where: PlayerWhereUniqueInput
    data: XOR<PlayerUpdateWithoutUserSessionInput, PlayerUncheckedUpdateWithoutUserSessionInput>
  }

  export type PlayerUpdateManyWithWhereWithoutUserSessionInput = {
    where: PlayerScalarWhereInput
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutUserSessionInput>
  }

  export type PlayerScalarWhereInput = {
    AND?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
    OR?: PlayerScalarWhereInput[]
    NOT?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
    id?: StringFilter<"Player"> | string
    name?: StringFilter<"Player"> | string
    createdAt?: DateTimeFilter<"Player"> | Date | string
    updatedAt?: DateTimeFilter<"Player"> | Date | string
    xp?: IntFilter<"Player"> | number
    team?: StringFilter<"Player"> | string
    position?: StringFilter<"Player"> | string
    active?: BoolFilter<"Player"> | boolean
    statCategoryXp?: JsonFilter<"Player">
    boosts?: JsonFilter<"Player">
    userSessionId?: StringFilter<"Player"> | string
    availablePlayerId?: StringFilter<"Player"> | string
  }

  export type ActiveBoostUpsertWithWhereUniqueWithoutUserSessionInput = {
    where: ActiveBoostWhereUniqueInput
    update: XOR<ActiveBoostUpdateWithoutUserSessionInput, ActiveBoostUncheckedUpdateWithoutUserSessionInput>
    create: XOR<ActiveBoostCreateWithoutUserSessionInput, ActiveBoostUncheckedCreateWithoutUserSessionInput>
  }

  export type ActiveBoostUpdateWithWhereUniqueWithoutUserSessionInput = {
    where: ActiveBoostWhereUniqueInput
    data: XOR<ActiveBoostUpdateWithoutUserSessionInput, ActiveBoostUncheckedUpdateWithoutUserSessionInput>
  }

  export type ActiveBoostUpdateManyWithWhereWithoutUserSessionInput = {
    where: ActiveBoostScalarWhereInput
    data: XOR<ActiveBoostUpdateManyMutationInput, ActiveBoostUncheckedUpdateManyWithoutUserSessionInput>
  }

  export type ActiveBoostScalarWhereInput = {
    AND?: ActiveBoostScalarWhereInput | ActiveBoostScalarWhereInput[]
    OR?: ActiveBoostScalarWhereInput[]
    NOT?: ActiveBoostScalarWhereInput | ActiveBoostScalarWhereInput[]
    id?: StringFilter<"ActiveBoost"> | string
    boostId?: StringFilter<"ActiveBoost"> | string
    playerId?: StringFilter<"ActiveBoost"> | string
    completed?: BoolFilter<"ActiveBoost"> | boolean
    endTime?: DateTimeNullableFilter<"ActiveBoost"> | Date | string | null
    createdAt?: DateTimeFilter<"ActiveBoost"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveBoost"> | Date | string
    userSessionId?: StringFilter<"ActiveBoost"> | string
  }

  export type PlayerCreateWithoutAvailablePlayerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    userSession: UserSessionCreateNestedOneWithoutPlayersInput
    activeBoosts?: ActiveBoostCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateWithoutAvailablePlayerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    userSessionId: string
    activeBoosts?: ActiveBoostUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerCreateOrConnectWithoutAvailablePlayerInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutAvailablePlayerInput, PlayerUncheckedCreateWithoutAvailablePlayerInput>
  }

  export type PlayerCreateManyAvailablePlayerInputEnvelope = {
    data: PlayerCreateManyAvailablePlayerInput | PlayerCreateManyAvailablePlayerInput[]
    skipDuplicates?: boolean
  }

  export type PlayerUpsertWithWhereUniqueWithoutAvailablePlayerInput = {
    where: PlayerWhereUniqueInput
    update: XOR<PlayerUpdateWithoutAvailablePlayerInput, PlayerUncheckedUpdateWithoutAvailablePlayerInput>
    create: XOR<PlayerCreateWithoutAvailablePlayerInput, PlayerUncheckedCreateWithoutAvailablePlayerInput>
  }

  export type PlayerUpdateWithWhereUniqueWithoutAvailablePlayerInput = {
    where: PlayerWhereUniqueInput
    data: XOR<PlayerUpdateWithoutAvailablePlayerInput, PlayerUncheckedUpdateWithoutAvailablePlayerInput>
  }

  export type PlayerUpdateManyWithWhereWithoutAvailablePlayerInput = {
    where: PlayerScalarWhereInput
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutAvailablePlayerInput>
  }

  export type UserSessionCreateWithoutPlayersInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
    session: SessionCreateNestedOneWithoutUserSessionsInput
    activeBoosts?: ActiveBoostCreateNestedManyWithoutUserSessionInput
  }

  export type UserSessionUncheckedCreateWithoutPlayersInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    sessionId: string
    activeBoosts?: ActiveBoostUncheckedCreateNestedManyWithoutUserSessionInput
  }

  export type UserSessionCreateOrConnectWithoutPlayersInput = {
    where: UserSessionWhereUniqueInput
    create: XOR<UserSessionCreateWithoutPlayersInput, UserSessionUncheckedCreateWithoutPlayersInput>
  }

  export type AvailablePlayerCreateWithoutPlayersInput = {
    id?: string
    name: string
    team: string
    position: string
    price: number
    stats: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailablePlayerUncheckedCreateWithoutPlayersInput = {
    id?: string
    name: string
    team: string
    position: string
    price: number
    stats: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AvailablePlayerCreateOrConnectWithoutPlayersInput = {
    where: AvailablePlayerWhereUniqueInput
    create: XOR<AvailablePlayerCreateWithoutPlayersInput, AvailablePlayerUncheckedCreateWithoutPlayersInput>
  }

  export type ActiveBoostCreateWithoutPlayerInput = {
    id?: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    boost: BoostCreateNestedOneWithoutActiveBoostsInput
    userSession: UserSessionCreateNestedOneWithoutActiveBoostsInput
  }

  export type ActiveBoostUncheckedCreateWithoutPlayerInput = {
    id?: string
    boostId: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userSessionId: string
  }

  export type ActiveBoostCreateOrConnectWithoutPlayerInput = {
    where: ActiveBoostWhereUniqueInput
    create: XOR<ActiveBoostCreateWithoutPlayerInput, ActiveBoostUncheckedCreateWithoutPlayerInput>
  }

  export type ActiveBoostCreateManyPlayerInputEnvelope = {
    data: ActiveBoostCreateManyPlayerInput | ActiveBoostCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type UserSessionUpsertWithoutPlayersInput = {
    update: XOR<UserSessionUpdateWithoutPlayersInput, UserSessionUncheckedUpdateWithoutPlayersInput>
    create: XOR<UserSessionCreateWithoutPlayersInput, UserSessionUncheckedCreateWithoutPlayersInput>
    where?: UserSessionWhereInput
  }

  export type UserSessionUpdateToOneWithWhereWithoutPlayersInput = {
    where?: UserSessionWhereInput
    data: XOR<UserSessionUpdateWithoutPlayersInput, UserSessionUncheckedUpdateWithoutPlayersInput>
  }

  export type UserSessionUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
    session?: SessionUpdateOneRequiredWithoutUserSessionsNestedInput
    activeBoosts?: ActiveBoostUpdateManyWithoutUserSessionNestedInput
  }

  export type UserSessionUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    activeBoosts?: ActiveBoostUncheckedUpdateManyWithoutUserSessionNestedInput
  }

  export type AvailablePlayerUpsertWithoutPlayersInput = {
    update: XOR<AvailablePlayerUpdateWithoutPlayersInput, AvailablePlayerUncheckedUpdateWithoutPlayersInput>
    create: XOR<AvailablePlayerCreateWithoutPlayersInput, AvailablePlayerUncheckedCreateWithoutPlayersInput>
    where?: AvailablePlayerWhereInput
  }

  export type AvailablePlayerUpdateToOneWithWhereWithoutPlayersInput = {
    where?: AvailablePlayerWhereInput
    data: XOR<AvailablePlayerUpdateWithoutPlayersInput, AvailablePlayerUncheckedUpdateWithoutPlayersInput>
  }

  export type AvailablePlayerUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stats?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvailablePlayerUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    stats?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveBoostUpsertWithWhereUniqueWithoutPlayerInput = {
    where: ActiveBoostWhereUniqueInput
    update: XOR<ActiveBoostUpdateWithoutPlayerInput, ActiveBoostUncheckedUpdateWithoutPlayerInput>
    create: XOR<ActiveBoostCreateWithoutPlayerInput, ActiveBoostUncheckedCreateWithoutPlayerInput>
  }

  export type ActiveBoostUpdateWithWhereUniqueWithoutPlayerInput = {
    where: ActiveBoostWhereUniqueInput
    data: XOR<ActiveBoostUpdateWithoutPlayerInput, ActiveBoostUncheckedUpdateWithoutPlayerInput>
  }

  export type ActiveBoostUpdateManyWithWhereWithoutPlayerInput = {
    where: ActiveBoostScalarWhereInput
    data: XOR<ActiveBoostUpdateManyMutationInput, ActiveBoostUncheckedUpdateManyWithoutPlayerInput>
  }

  export type ActiveBoostCreateWithoutBoostInput = {
    id?: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    player: PlayerCreateNestedOneWithoutActiveBoostsInput
    userSession: UserSessionCreateNestedOneWithoutActiveBoostsInput
  }

  export type ActiveBoostUncheckedCreateWithoutBoostInput = {
    id?: string
    playerId: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userSessionId: string
  }

  export type ActiveBoostCreateOrConnectWithoutBoostInput = {
    where: ActiveBoostWhereUniqueInput
    create: XOR<ActiveBoostCreateWithoutBoostInput, ActiveBoostUncheckedCreateWithoutBoostInput>
  }

  export type ActiveBoostCreateManyBoostInputEnvelope = {
    data: ActiveBoostCreateManyBoostInput | ActiveBoostCreateManyBoostInput[]
    skipDuplicates?: boolean
  }

  export type ActiveBoostUpsertWithWhereUniqueWithoutBoostInput = {
    where: ActiveBoostWhereUniqueInput
    update: XOR<ActiveBoostUpdateWithoutBoostInput, ActiveBoostUncheckedUpdateWithoutBoostInput>
    create: XOR<ActiveBoostCreateWithoutBoostInput, ActiveBoostUncheckedCreateWithoutBoostInput>
  }

  export type ActiveBoostUpdateWithWhereUniqueWithoutBoostInput = {
    where: ActiveBoostWhereUniqueInput
    data: XOR<ActiveBoostUpdateWithoutBoostInput, ActiveBoostUncheckedUpdateWithoutBoostInput>
  }

  export type ActiveBoostUpdateManyWithWhereWithoutBoostInput = {
    where: ActiveBoostScalarWhereInput
    data: XOR<ActiveBoostUpdateManyMutationInput, ActiveBoostUncheckedUpdateManyWithoutBoostInput>
  }

  export type BoostCreateWithoutActiveBoostsInput = {
    id?: string
    name: string
    description: string
    multiplier: number
    duration: number
    cost: number
    boostType: string
  }

  export type BoostUncheckedCreateWithoutActiveBoostsInput = {
    id?: string
    name: string
    description: string
    multiplier: number
    duration: number
    cost: number
    boostType: string
  }

  export type BoostCreateOrConnectWithoutActiveBoostsInput = {
    where: BoostWhereUniqueInput
    create: XOR<BoostCreateWithoutActiveBoostsInput, BoostUncheckedCreateWithoutActiveBoostsInput>
  }

  export type PlayerCreateWithoutActiveBoostsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    userSession: UserSessionCreateNestedOneWithoutPlayersInput
    availablePlayer: AvailablePlayerCreateNestedOneWithoutPlayersInput
  }

  export type PlayerUncheckedCreateWithoutActiveBoostsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    userSessionId: string
    availablePlayerId: string
  }

  export type PlayerCreateOrConnectWithoutActiveBoostsInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutActiveBoostsInput, PlayerUncheckedCreateWithoutActiveBoostsInput>
  }

  export type UserSessionCreateWithoutActiveBoostsInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
    session: SessionCreateNestedOneWithoutUserSessionsInput
    players?: PlayerCreateNestedManyWithoutUserSessionInput
  }

  export type UserSessionUncheckedCreateWithoutActiveBoostsInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    sessionId: string
    players?: PlayerUncheckedCreateNestedManyWithoutUserSessionInput
  }

  export type UserSessionCreateOrConnectWithoutActiveBoostsInput = {
    where: UserSessionWhereUniqueInput
    create: XOR<UserSessionCreateWithoutActiveBoostsInput, UserSessionUncheckedCreateWithoutActiveBoostsInput>
  }

  export type BoostUpsertWithoutActiveBoostsInput = {
    update: XOR<BoostUpdateWithoutActiveBoostsInput, BoostUncheckedUpdateWithoutActiveBoostsInput>
    create: XOR<BoostCreateWithoutActiveBoostsInput, BoostUncheckedCreateWithoutActiveBoostsInput>
    where?: BoostWhereInput
  }

  export type BoostUpdateToOneWithWhereWithoutActiveBoostsInput = {
    where?: BoostWhereInput
    data: XOR<BoostUpdateWithoutActiveBoostsInput, BoostUncheckedUpdateWithoutActiveBoostsInput>
  }

  export type BoostUpdateWithoutActiveBoostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    multiplier?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cost?: IntFieldUpdateOperationsInput | number
    boostType?: StringFieldUpdateOperationsInput | string
  }

  export type BoostUncheckedUpdateWithoutActiveBoostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    multiplier?: FloatFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cost?: IntFieldUpdateOperationsInput | number
    boostType?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUpsertWithoutActiveBoostsInput = {
    update: XOR<PlayerUpdateWithoutActiveBoostsInput, PlayerUncheckedUpdateWithoutActiveBoostsInput>
    create: XOR<PlayerCreateWithoutActiveBoostsInput, PlayerUncheckedCreateWithoutActiveBoostsInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutActiveBoostsInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutActiveBoostsInput, PlayerUncheckedUpdateWithoutActiveBoostsInput>
  }

  export type PlayerUpdateWithoutActiveBoostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    userSession?: UserSessionUpdateOneRequiredWithoutPlayersNestedInput
    availablePlayer?: AvailablePlayerUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type PlayerUncheckedUpdateWithoutActiveBoostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    userSessionId?: StringFieldUpdateOperationsInput | string
    availablePlayerId?: StringFieldUpdateOperationsInput | string
  }

  export type UserSessionUpsertWithoutActiveBoostsInput = {
    update: XOR<UserSessionUpdateWithoutActiveBoostsInput, UserSessionUncheckedUpdateWithoutActiveBoostsInput>
    create: XOR<UserSessionCreateWithoutActiveBoostsInput, UserSessionUncheckedCreateWithoutActiveBoostsInput>
    where?: UserSessionWhereInput
  }

  export type UserSessionUpdateToOneWithWhereWithoutActiveBoostsInput = {
    where?: UserSessionWhereInput
    data: XOR<UserSessionUpdateWithoutActiveBoostsInput, UserSessionUncheckedUpdateWithoutActiveBoostsInput>
  }

  export type UserSessionUpdateWithoutActiveBoostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
    session?: SessionUpdateOneRequiredWithoutUserSessionsNestedInput
    players?: PlayerUpdateManyWithoutUserSessionNestedInput
  }

  export type UserSessionUncheckedUpdateWithoutActiveBoostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    players?: PlayerUncheckedUpdateManyWithoutUserSessionNestedInput
  }

  export type UserSessionCreateManyUserInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionId: string
  }

  export type UserSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutUserSessionsNestedInput
    players?: PlayerUpdateManyWithoutUserSessionNestedInput
    activeBoosts?: ActiveBoostUpdateManyWithoutUserSessionNestedInput
  }

  export type UserSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionId?: StringFieldUpdateOperationsInput | string
    players?: PlayerUncheckedUpdateManyWithoutUserSessionNestedInput
    activeBoosts?: ActiveBoostUncheckedUpdateManyWithoutUserSessionNestedInput
  }

  export type UserSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionId?: StringFieldUpdateOperationsInput | string
  }

  export type UserSessionCreateManySessionInput = {
    id?: string
    xp?: number
    money?: number
    joinedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type UserSessionUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
    players?: PlayerUpdateManyWithoutUserSessionNestedInput
    activeBoosts?: ActiveBoostUpdateManyWithoutUserSessionNestedInput
  }

  export type UserSessionUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    players?: PlayerUncheckedUpdateManyWithoutUserSessionNestedInput
    activeBoosts?: ActiveBoostUncheckedUpdateManyWithoutUserSessionNestedInput
  }

  export type UserSessionUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    money?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerCreateManyUserSessionInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    availablePlayerId: string
  }

  export type ActiveBoostCreateManyUserSessionInput = {
    id?: string
    boostId: string
    playerId: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlayerUpdateWithoutUserSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    availablePlayer?: AvailablePlayerUpdateOneRequiredWithoutPlayersNestedInput
    activeBoosts?: ActiveBoostUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateWithoutUserSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    availablePlayerId?: StringFieldUpdateOperationsInput | string
    activeBoosts?: ActiveBoostUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateManyWithoutUserSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    availablePlayerId?: StringFieldUpdateOperationsInput | string
  }

  export type ActiveBoostUpdateWithoutUserSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    boost?: BoostUpdateOneRequiredWithoutActiveBoostsNestedInput
    player?: PlayerUpdateOneRequiredWithoutActiveBoostsNestedInput
  }

  export type ActiveBoostUncheckedUpdateWithoutUserSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    boostId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveBoostUncheckedUpdateManyWithoutUserSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    boostId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerCreateManyAvailablePlayerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    xp?: number
    team: string
    position: string
    active?: boolean
    statCategoryXp: JsonNullValueInput | InputJsonValue
    boosts: JsonNullValueInput | InputJsonValue
    userSessionId: string
  }

  export type PlayerUpdateWithoutAvailablePlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    userSession?: UserSessionUpdateOneRequiredWithoutPlayersNestedInput
    activeBoosts?: ActiveBoostUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateWithoutAvailablePlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    userSessionId?: StringFieldUpdateOperationsInput | string
    activeBoosts?: ActiveBoostUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateManyWithoutAvailablePlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    xp?: IntFieldUpdateOperationsInput | number
    team?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    statCategoryXp?: JsonNullValueInput | InputJsonValue
    boosts?: JsonNullValueInput | InputJsonValue
    userSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ActiveBoostCreateManyPlayerInput = {
    id?: string
    boostId: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userSessionId: string
  }

  export type ActiveBoostUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    boost?: BoostUpdateOneRequiredWithoutActiveBoostsNestedInput
    userSession?: UserSessionUpdateOneRequiredWithoutActiveBoostsNestedInput
  }

  export type ActiveBoostUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    boostId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ActiveBoostUncheckedUpdateManyWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    boostId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ActiveBoostCreateManyBoostInput = {
    id?: string
    playerId: string
    completed?: boolean
    endTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userSessionId: string
  }

  export type ActiveBoostUpdateWithoutBoostInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: PlayerUpdateOneRequiredWithoutActiveBoostsNestedInput
    userSession?: UserSessionUpdateOneRequiredWithoutActiveBoostsNestedInput
  }

  export type ActiveBoostUncheckedUpdateWithoutBoostInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessionId?: StringFieldUpdateOperationsInput | string
  }

  export type ActiveBoostUncheckedUpdateManyWithoutBoostInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userSessionId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}