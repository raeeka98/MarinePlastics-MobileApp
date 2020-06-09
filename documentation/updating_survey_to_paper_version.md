# Updating the mobile app survey to the current datasheet

By end of Spring 2020 qaurter, we were able to update the mobile app survey to the newest datasheet version of 2020. New debris items were introduced or separated, a new checkbox list was added to the accumulation sweep survey, we added a comment section to the wind portion of the survey, back-end files were updated and JSON files show up on Mlab.

1. go to screens folder
2. go to survey folder
3. all different screens for each part of the survey are there
4. easily update the code according to new datasheet
5. make sure to look at each file within the survey folder to make sure everything is handled properly
5. make sure backend is connected to the frontend new UI by updating SurveyContainer.js and PublishContainer.js
6. PublishContainer.js is located in the Publish folder which is right above the survey folder
7. check that your code aligns with the new datasheet by ensuring it was sent into the database and you can see the updated/new items
8. make sure to format your code