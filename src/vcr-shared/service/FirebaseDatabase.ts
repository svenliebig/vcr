import firebase from "firebase/app"

/**
 * Includes methods to commicate with the firebase database.
 *
 * @export
 * @class Firebase
 */
export default class FirebaseDatabase {
    private db: firebase.database.Database

    constructor(app: firebase.app.App) {
        this.db = app.database()
    }

    /**
     * Writes data to the node, the provided value should be an object or string.
     * After the action, a promises is returned and can be used.
     *
     * @param {String} path the node to write the datavalue
     * @param {{ [key: string]: string } | string} value the value to write on the node
     * @returns {Promise<void>} after the data was written
     * @memberof Firebase
     *
     * @example
     * instance.write("/my/path", { my: "object" }).then(() => console.log("done!"))
     */
    public write(path: string, value: { [key: string]: string } | string | Object): Promise<void> {
        return this.db.ref(path).set(value)
    }

    /**
     * Reads the value of the given node and returns a promise with the value.
     *
     * @param {String} path the node where to read the value
     * @return {Promise.<any>} called with the value after reading
     * @memberof Firebase
     */
    public get(path: string): Promise<any> {
        return this.db.ref(path).once("value")
            .then(snapshot => Promise.resolve(snapshot.val()))
    }

    /**
	 * Returns the node that match the given criteria. For example the parameters
	 * '/users', 'id' and '12345' will return a object from the node users where
	 * users/{userkey}/id equals 12345. {userkey} is one of the firebase automatic generated
	 * unqiue keys for a node. getWhere will iteratre through all childs, no matter what key they have.
	 *
	 * @param {string} node
	 * @param {string} child
	 * @param {string | boolean | number | object} value
	 */
    public getWhere(node: string, child: string, value: string | boolean | number | null) {
        return this.db.ref(node).orderByChild(child).equalTo(value).once("value").then(snapshot => {
            const val = snapshot.val()
            if (val === null) {
                return null
            }
            if (Array.isArray(val)) {
                return Promise.resolve(val.filter(e => e))
            }
            return Promise.resolve(val)
        })
    }

    /**
     * Removes the node from the database and calls the optional callback after this.
     *
     * @param {String} path node to remove
     * @return {Promise<void>} called after the remove
     * @memberof Firebase
     */
    public remove(path: string): Promise<void> {
        return this.db.ref(path).remove()
    }

    /**
     * Checks if the given node exists in the database and returns a promise with true of false.
     *
     * @param {String} path the node to check if it exists
     * @return {Promise<boolean>} true if the node exists, false if not
     * @memberof Firebase
     */
    public exists(path: string): Promise<boolean> {
        return this.db.ref(path).once("value")
            .then(snapshot => Promise.resolve(snapshot.exists()))
    }
}