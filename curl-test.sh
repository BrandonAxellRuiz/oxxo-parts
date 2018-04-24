#!/bin/bash
curl -X POST -H "Authorization: key=AAAAut07DpQ:APA91bGLvRyLtFRTahYcuLk1f89rSQqvztqPl-TU7p8x0Y5kO24F9Jt4L5fkzDwn2PDhLQh6FTmGmlHh1i4t4lS63XXbWf_jEe6Tk9fp-CPofAjeJR2MH3N-NC2IET-TpXzIM_sCpmTN" -H "Content-Type: application/json" \
   -d '{
  "data": {
    "notification": {
        "title": "FCM Message",
        "body": "This is an FCM Message",
        "icon": "/itwonders-web-logo.png",
    }
  },
  "to": "eUGVeCmO_c0:APA91bGxvUGbwGYb53MfQe0ynrvdPa3QgqnK1Gb8my6QCwcc77sVa3w66n16Tdx0hatOsuTlKDI-Cds3uZOvyMMQ6JMU7sr4EAsBOey3wxtLFKYSFebFgcNDpoTO-Crm9OqfAxPVGnRM"
}' https://fcm.googleapis.com/fcm/send
