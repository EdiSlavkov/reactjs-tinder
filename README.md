## TINDER COPY

This project is the final project of IT Talents season 14. It is a Tinder clone with some unique features and slight differences from the original application.

### Highlights:

- Swipe Cards: Users can swipe left or right to like or dislike other people's profiles.
- Real-time Messaging: Users can engage in real-time chat with matched individuals.
- Profile Verification: Users can verify their profiles using a selfie taken from the device's camera.
- Picture Upload: Users can upload up to 8 pictures and choose their profile picture.
- Profile Information: Users can provide and update their gender, preferences, phone number, passions, and zodiac sign.

### How It Works:

1. Home Page:
   - Users can log in or create a new account.
   - Account creation requires a valid email and a password with specific criteria.
   - After successful registration, users are redirected to the login modal.

2. Login Page:
   - Users enter their registered email and password to log in.
   - After successful login, users are redirected to the profile page.

3. Profile Page:
   - Users must fill in required information such as names, age, and phone number to unlock all features.
   - Users can preview their profile and edit the information.
   - They can add up to 8 pictures, delete pictures, and take a selfie for profile verification.
   - Users can change their profile picture and update gender, location, passions, and other details.
   - They can set interests in men, women, or both to control the profiles they see.

4. Explore Page:
   - Users can swipe through other people's profiles presented as swipeable cards with brief information.
   - Left swipe indicates dislike, while right swipe indicates like.
   - If a user likes another user, a blurred profile picture of that person appears in the "matched" section.
   - When a match occurs, both users can engage in real-time messaging.

### Chat:
- The chat functionality uses local storage and session storage to enable testing with multiple tabs.
- Users can access emojis in the chat.
- The chat automatically scrolls to the latest message.
- Messages are displayed with timestamps.
- Unread messages are indicated with a notification on the matched user's profile picture.

### Libraries Used:

- Redux Toolkit: For global state management.
- React Router: For navigation between pages.
- Framer Motion: For swipeable user cards.
- Nuka Carousel: For the landing page carousel with user comments.
- Emoji Picker React: For the chat's emoji options.
- Bootstrap and MUI Material: For icons and modals.
- Jest: For unit tests.
