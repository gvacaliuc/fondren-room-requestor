const modofun = require('modofun')
const rp = require('request-promise')
const request = require('request')

/**
 * Returns a Promise for an authenticated request given a username and 
 * password.
 *
 * @param {String} netID: Rice NetID
 * @param {String} password: Rice NetID password
 */
function getAuthenticatedJar (netID, password) {
    
    const TAG = "getAuthJar";

    console.log(TAG, "-", "netID: ", netID);
    console.log(TAG, "-", "password: ", password);

    var jar = rp.jar();
    var options = {
        uri: "https://rooms.library.rice.edu/Web/index.php",
        jar: jar,
        method: "POST",
        form: {
            email: netID,
            password: password
        }
    };

    return new Promise( (resolve, reject) => {
        rp(options)
            .then((body) => {
                resolve(jar);
            })
            .catch((err) => {
                reject(err);
            });

    } );

};

/**
 * Returns a Promise for an authenticated request jar given a request.
 *
 * @param {Request} req: Google Cloud Request
 */
function getAuthenticatedJarFromRequest (req) {
    return getAuthenticatedJar(req.body.netID, req.body.password);
};

/**
 * Attempts to book a new room at Fondren Library given a jar with an
 * authenticated login cookie and a room ID.  Note that the roomID must
 * be a string.
 *
 * @param {RequestJar} jar: the authenticated jar from request-promise
 * @param {String} roomID: the Fondren Library roomID
 */
function bookRoom (jar, roomID) {

    console.log("jar passed to bookRoom", jar);

    var headers = {
        'Origin': 'https://rooms.library.rice.edu',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryBwOf1tsQuTZpBdB5',
        'Accept': '*/*',
        'Referer': 'https://rooms.library.rice.edu/Web/reservation.php?rid=2&sid=1&rd=2017-12-28&sd=2017-12-28%2010%3A00%3A00&ed=2017-12-28%2011%3A30%3A00',
        'X-Requested-With': 'XMLHttpRequest',
        'Connection': 'keep-alive',
        'Cookie': 'resource_filter1=%7B%22ScheduleId%22%3A%221%22%2C%22ResourceIds%22%3A%5B%5D%2C%22ResourceTypeId%22%3Anull%2C%22MinCapacity%22%3Anull%2C%22ResourceAttributes%22%3A%5B%5D%2C%22ResourceTypeAttributes%22%3A%5B%5D%7D; schedule_calendar_toggle=false; PHPSESSID=sas96j0k00ugsi6n6216cdomg7; __unam=bf980eb-15f2d9ce416-30111ce3-4; hubspotutk=1a3298c3dcb6d4e173ced6f40594a043; _ga=GA1.2.1475807392.1506885848; __hstc=95890179.1a3298c3dcb6d4e173ced6f40594a043.1507337407993.1508869176588.1513167392592.3'
    };

    var dataString = '$------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="userId"\r\n\r\n1302\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="scheduleId"\r\n\r\n1\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="resourceId"\r\n\r\n2\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="beginDate"\r\n\r\n2017-12-28\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="beginPeriod"\r\n\r\n10:00:00\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="endDate"\r\n\r\n2017-12-28\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="endPeriod"\r\n\r\n11:30:00\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="reservationTitle"\r\n\r\n\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="reservationDescription"\r\n\r\n\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="reservationId"\r\n\r\n\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="referenceNumber"\r\n\r\n\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="reservationAction"\r\n\r\ncreate\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="seriesUpdateScope"\r\n\r\nfull\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5\r\nContent-Disposition: form-data; name="CSRF_TOKEN"\r\n\r\nNDkwYzRkYTIwM2FhZTQwMjk2NWZiYTM3OWQxYmQzMWM=\r\n------WebKitFormBoundaryBwOf1tsQuTZpBdB5--\r\n';

    var options = {
        url: 'https://rooms.library.rice.edu/Web/ajax/reservation_save.php',
        method: 'POST',
        headers: headers,
        //jar: jar,
        body: dataString,
        followRedirect: true
    };
    
        //var options = {
        //method: "POST",
        //jar: jar,
        //uri: "https://rooms.library.rice.edu/Web/ajax/reservation_save.php",
        //formData: {
            //resourceId: roomID,
            //beginDate: "2017-12-28",
            //endDate: "2017-12-28",
            //beginPeriod: "12:00:00",
            //endPeriod: "14:00:00"
        //},
        //resolveWithFullResponse: true,
        //followAllRedirects: true,
    //};
    
    return rp(options)
};

function bookRoomWrapper (req, res) {
    var roomID = req.params[0];
    getAuthenticatedJarFromRequest(req)
        .then( (jar) => {
            bookRoom(jar, roomID)
                .then( (body) => {
                    res.status(200).send(body);
                } )
                .catch( (err) => {
                    res.status(501).send(err);
                } )
        } )
        .catch( (err) => {
            console.log(err);
            res.status(501).send("Issue logging in.")
        } );
};

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
function helloWorld (req, res) {
  if (req.body.message === undefined) {
    // This is an error case, as "message" is required
    console.log(req);
    res.status(400).send('No message defined!');
  } else {
    // Everything is ok
    console.log(req.body.message);
    console.log(req.params);
    //console.log(res);
    res.status(200).send(req.body.message);
  }
};

var controller = {
    helloWorld: helloWorld,
    book: bookRoomWrapper
};

exports.fondyRooms = modofun(controller, { mode: 'reqres', type: 'gcloud' });
