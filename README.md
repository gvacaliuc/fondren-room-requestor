# Fondren Room Requestor

A Google Cloud Function to list / describe / request rooms at Rice's
Fondren Libarary.  

## Example usage using the [Cloud Functions Emulator](https://github.com/GoogleCloudPlatform/cloud-functions-emulator)

May or may not work, but thought it good to document.

```bash
curl -H Content-Type: application/json \
     -X POST \
     -d {"netID":"<net id>","password":"<password>"} 
     http://localhost:8010/<project name>/<zone name>/<function name>/book/<room id>
```

## API

Will add the API links when they're created.  



## TODO:

* function to generate cookie for rooms.library.rice.edu
* functionality to list rooms given
    * room id
    * a time frame
    * minimum number of people
    * has a tv
* functionality to reserve a room given
    * the above criteria
* functionality to un-reserve a room given
    * the above criteria
