# Firebase-Train-Scheduler
Firebase homework assignment (train scheduler)
URL: https://rhoang57.github.io/Firebase-Train-Scheduler/

Project Objectives: To create an app that allows users to create a train schedule in real time.

Process (Solutions and Technical Considerations): 

Front-end considerations:A form was created on the app that allows the user to input the following information: 1) Train Name, 2) Destination, 3) First Train Time, and 4) Frequency. 

Database considerations: The user's input would then be stored on the Firebase database. Once the information is stored as variables in the database, the train times were converted to military time using MomentJs. This conversion allows for consistency with the current time which is also converted to the same format using MomentJs. Converting the first train time posed an additional step. To avoid having the database confuse the first train's time with the current time, it had to be converted to the same time from 1 year ago. This converted time was then stored as a variable in the database. With this information along with the other user inputs, variables were created to determine when the time of the next train arrival and the number of minutes before the next train. All of this information would then be appended to the table on the user's interface. 
