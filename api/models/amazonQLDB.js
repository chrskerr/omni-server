const { PooledQldbDriver, QldbDriver, QldbSession } = require("amazon-qldb-driver-nodejs");
const { ClientConfiguration } = require("aws-sdk/clients/qldbsession");

const pooledQldbDriver = createQldbDriver();

// /**
//  * Close a QLDB session object.
//  * @param session The session to close.
//  */
module.exports function closeQldbSession(session): void {
    if (null != session) {
        session.close();
    }
}

// /**
//  * Create a pooled driver for creating sessions.
//  * @param ledgerName The name of the ledger to create the driver on.
//  * @param serviceConfigurationOptions The configurations for the AWS SDK client that the driver uses.
//  * @returns The pooled driver for creating sessions.
//  */
module.exports function createQldbDriver(
    ledgerName: string = 'referendum', 
    serviceConfigurationOptions: ClientConfiguration = {}
): QldbDriver {
    const qldbDriver = new PooledQldbDriver(ledgerName, serviceConfigurationOptions);
    return qldbDriver;
}


// /**
//  * Retrieve a QLDB session object.
//  * @returns Promise which fufills with a {@linkcode QldbSession} object.
//  */
module.exports async function createQldbSession() {
    const qldbSession = await pooledQldbDriver.getSession();
    return qldbSession;
}

// /**
//  * Connect to a session for a given ledger using default settings.
//  * @returns Promise which fulfills with void.
//  */
var main = async function() {
    let session = null;
    try {
        session = await createQldbSession();
        console.log("Listing table names...");
        const tableNames = await session.getTableNames();
        tableNames.forEach((tableName) => {
            console.log(tableName);
        });
    } catch (e) {
        console.error(`Unable to create session: ${e}`);
    } finally {
        closeQldbSession(session);
    }
}

if (require.main === module) {
    main();
}