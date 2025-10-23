# Axionic-Wrapper API Endpoints

## Admin
1. **Admin Reset Password** - POST `/auth/admin-reset-password`

## Authentication
1. **Logout** - POST `/auth/logout`
2. **Refresh Token** - POST `/auth/refresh-token`
3. **SignIN** - POST `/auth/signin`
4. **Signup** - POST `/auth/signupAdmin`
5. **checking** - POST `/calls/sip-groups/create`
6. **profile** - POST `/auth/upload-profile-image`

## Calls
1. **Accept Call** - POST `/calls/accept`
2. **Add Participant** - POST `/calls/add-participant`
3. **Create Call** - POST `/calls/create`
4. **Create Conference Call** - POST `/calls/createConfCall`
5. **GET CALL LOGS** - GET `/calls/call-details/{call_id}`
6. **Get User Logs with Sip** - GET `/calls/user-call-details_v2`
7. **Get User Logs** - GET `/calls/user-call-details`
8. **Leave Call** - POST `/calls/leave`
9. **Update Call Status** - POST `/calls/updateCallStatus`

## Chat
1. **Add Chat Message** - POST `/chats/messages`
2. **Get Call Messages** - GET `/chats/messages/{call_id}`
3. **Mark Message as Read** - PUT `/chats/messages/mark-as-read`
4. **Update Message** - PUT `/chats/messages/update`

## Chat-new
1. **Edit messages** - PATCH `/chats/messages/{message_id}`
2. **Get Room by id** - GET `/chats/{room_id}`
3. **Get Room** - GET `/chats`
4. **Get messages roomId** - GET `/chats/messages/{room_id}`
5. **Remove participant** - DELETE `/chats/{room_id}/participants`
6. **add participant** - POST `/chats/{room_id}/participants`
7. **create room** - POST `/chats/`
8. **delete messages** - DELETE `/chats/messages/{message_id}`
9. **delete reaction** - DELETE `/chats/messages/{message_id}/reactions`
10. **last seen** - POST `/chats/{room_id}/read`
11. **leave participant** - DELETE `/chats/{room_id}/leave-participant`
12. **post reaction** - POST `/chats/messages/{message_id}/reactions`
13. **presence** - POST `/chats/{room_id}/read`
14. **presign-urls** - POST `/chats/presign-urls`
15. **read message** - POST `/chats/messages/{message_id}/reactions`
16. **send messages** - POST `/chats/messages`
17. **upload file** - POST `/chats/misc/signed-url`
18. **upload url presign** - PUT (External URL with token)

## Meetings
1. **Add participant** - POST `/meetings/{meeting_id}/participant`
2. **Create Meetings copy** - POST `/meetings/create`
3. **Create Meetings** - POST `/meetings/create`
4. **Delete Participant** - DELETE `/meetings/meeting/{meeting_id}/participant`
5. **Delete meeting by id** - DELETE `/meetings/{meeting_id}/delete`
6. **Get Meetings** - GET `/meetings`
7. **Get meeting by id** - GET `/meetings/{meeting_id}`
8. **Join Meeting** - POST `/meetings/{meeting_id}/join`
9. **Leave Meeting** - POST `/meetings/{meeting_id}/leave`
10. **Update Cancel Status** - POST `/meetings/{meeting_id}/cancel`
11. **Update Meeting Status** - PATCH `/meetings/{meeting_id}/status`
12. **Update Meeting** - PATCH `/meetings/{meeting_id}`
13. **User avilability** - GET `/meetings/users/availability`
14. **dismiss meeting** - POST `/meetings/{meeting_id}/dismiss`
15. **recall** - POST `/meetings/{meeting_id}/recall/{user_id}`
16. **toogle screen share** - POST `/meetings/{meeting_id}/toggle-screen-sharing`

## Push Notifications
1. **Get User Notifications** - GET `/auth/notifications`
2. **Send Push Notification** - POST `/calls/sendPush`

## Recordings
1. **Download Recording** - POST `/calls/record/download`
2. **Get Call Recording Details** - GET `/calls/record/list/{call_id}`
3. **Start Recording** - POST `/calls/record-start`
4. **Stop Recording** - POST `/calls/record-stop`

## Reports
1. **Get Reports** - GET `/calls/getReports`

## Screen Share
1. **Start Screen Share** - POST `/calls/screen-sharing-start`
2. **Stop Screen Share** - POST `/calls/screen-sharing-stop`

## Sip
1. **Add Sip Details** - POST `/calls/addSipDetails`
2. **Bulk Add Sip Details** - POST `/calls/bulkAddSipDetails`
3. **Free Switched to Axionic Call** - POST `/calls/addAxionicDetails`
4. **Get Sip Details** - GET `/calls/getSipDetails`
5. **Remove Sip Details** - DELETE `/calls/removeSipDetails`
6. **Update Sip Details** - PUT `/calls/updateSipDetails`

### Sip Outgoing Calls
7. **Create Sip Call** - POST `/calls/sip-call-details`
8. **Update Sip Call** - PUT `/calls/sip-call-details`

## Users
1. **Get ALL Users** - GET `/auth/users`
2. **Get Presence** - GET `/auth/presence`
3. **Get User Sip Details** - GET `/auth/sip`
4. **Get User by ID** - GET `/auth/users/{user_id}`
5. **Register New Dev Token** - POST `/auth/registerDeviceToken`
6. **Reset Password** - PUT `/auth/reset-password`
7. **Update Presence** - POST `/auth/presence`
8. **Update Profile Picture** - POST `/auth/upload-profile-image`
9. **Update User** - PUT `/auth/update-user`

## sip-group
1. **add participant** - POST `/calls/sip-groups/add-participant`
2. **create Room** - POST `/calls/sip-groups/create`
3. **delete participat** - DELETE `/calls/sip-groups/delete-participant`
4. **get sip group** - GET `/calls/sip-groups`
5. **update sip group** - PATCH `/calls/sip-groups/update`

---

## Summary by HTTP Method

- **GET**: 14 endpoints
- **POST**: 46 endpoints
- **PUT**: 5 endpoints
- **PATCH**: 4 endpoints
- **DELETE**: 6 endpoints

**Total API Endpoints**: 75