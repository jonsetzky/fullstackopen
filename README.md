# fullstackopen

## 3.11 (and 3.10)

Setup doesn't completely follow instructions as frontend is served by Render instead of Express. This is to avoid committing the build (dist dir) to git. This setup does however require CORS setup as well as having to pass backend's URL as env variable to frontend.

- [app on Render](https://fullstackopen-0mp8.onrender.com/)

## 3.21

The approach I initially chose contradicts the note at the bottom of this task stating that frontend shouldn't be directly deployed. I can't come up with a reason why the embedded frontend approach would be better over separate deployments. However, in order to comply with the task, I changed the approach at this task and embedded the frontend's build in Git.

## 4.16

The instructions note that password restrictions shouldn't be handled by Mongoose validation, but in my approach it's possible as hashing is done in the pre-save hook.
