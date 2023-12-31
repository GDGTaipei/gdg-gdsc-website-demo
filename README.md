# GDG GDSC Website Example 

## Structure
* FrontStage : [Demo Web Page](https://hank199599.web.app)  
  * main page
  * activity
  * annual_activity
  * team
  * partners
* BackStage : [Demo Web Page](https://hank199599.web.app/backstage)
  * DashBoard with Calender
  * Full customization in annual_activity
  * Full customization in team
  * Full customization in partners
  * Full customization in social Media

## Adjust
  You can find the `commend_setting.js` file in the `public` folder.  
  In here you can adjust the source to GDG / GDSC.

 ### How to get the Bevy Chapter ID?
  Query your chapter in   
  https://gdg.community.dev/api/search/chapter?q=YourChapterName   
  OR  
  https://gdsc.community.dev/api/search/chapter?q=YourChapterName
  
  you'll find the id shown in the result list, like this:
  ```
  https://gdg.community.dev/api/search/chapter?q=GDG Taipei
  ```
  Output:
  ```
  results: [
    {
      id: 748,
      title: "GDG Taipei",
      city: "Taipei",
      state: "",
      chapter_location: "Taipei (TW)",
      ...
    }
  ]
  ```
 ## How to use this Repo?

#### Steps to create a Firebase project and set up the Firebase hosting in local:

1. **Create a Firebase project.** You can do this by visiting the Firebase Console: https://console.firebase.google.com/ and clicking on the "Create Project" button.
2. **Initialize your project.** Once you have created a project, you need to initialize it by running the following command in your terminal:

```
firebase init
```

This will create a `firebase.json` file in your project directory.

3. **Enable Firebase hosting.** In the `firebase.json` file, add the following line to enable Firebase hosting:

```
{
  "hosting": {
    "enabled": true
  }
}
```

4. **Deploy your project locally.** To deploy your project locally, run the following command in your terminal:

```
firebase deploy --only hosting
```

This will deploy your project to Firebase Hosting, which you can then access at `localhost:5000`.

Here are some additional resources that you may find helpful:

* Firebase Hosting documentation: https://firebase.google.com/docs/hosting
* Firebase CLI documentation: https://firebase.google.com/docs/cli


#### Instructions to import JSON to Firebase Realtime Database:

1. **Create a Firebase project and enable the Realtime Database.** You can do this by visiting the Firebase Console: https://console.firebase.google.com/ and clicking on the "Create Project" button. Once you have created a project, enable the Realtime Database by clicking on the "Database" tab and clicking on the "Enable" button.
2. **Create a JSON file.** The JSON file should contain the data that you want to import into the Realtime Database. The file should be saved in a format that is compatible with the Realtime Database, which means that it should be a UTF-8 encoded file.
3. **Import the JSON file into the Realtime Database.** There are two ways to import the JSON file into the Realtime Database:
    * **Using the Firebase CLI.** You can use the Firebase CLI to import the JSON file by running the following command in your terminal:

```
firebase import real-time-database-import.json
```

* **Using the Firebase Console.** You can also import the JSON file by using the Firebase Console. To do this, follow these steps:
    1. Go to the Firebase Console and click on the "Database" tab.
    2. Click on the "Import" button.
    3. Select the JSON file `real-time-database-import.json` to import.
    4. Click on the "Import" button.

1. **Verify that the data has been imported successfully.** You can verify that the data has been imported successfully by opening the Realtime Database in the Firebase Console. The data should be displayed in the Realtime Database.

Here are some additional resources that you may find helpful:

* Firebase Realtime Database documentation: https://firebase.google.com/docs/database/
* Firebase CLI documentation: https://firebase.google.com/docs/cli


### Declaration

The Project is build by the following open source projects by Creative Tim:
* https://www.creative-tim.com/product/argon-design-system
* https://www.creative-tim.com/product/material-dashboard