# RanChat

**Be Real. Stay Anonymous.**

RanChat is an anonymous classroom-chat app. Students join a classroom with a short code and talk freely without revealing who they are. Classroom owners get simple controls to keep the space safe, and a Premium plan (powered by RevenueCat) lifts the free-tier limits.


[![Watch the RanChat demo](https://img.youtube.com/vi/ii_TWaPxee8/hqdefault.jpg)](https://www.youtube.com/watch?v=ii_TWaPxee8)

## Features

**Anonymity and accounts**
- Every user gets an anonymous identity, so real names are never shown in classrooms
- Sign in with Email, Google, or Anonymous, with persistent login
- Anonymous avatar with selectable theme colors and a matching glowing shield banner

**Classrooms**
- Create a classroom (with an optional photo) or join one with a 6-character code
- Codes exclude look-alike characters and rotate automatically after 3 days
- Real-time text chat
- Members list, leave classroom, and an alerts feed of the latest activity in your classrooms

**Owner controls**
- Block screenshots for the whole classroom
- Turn off messaging temporarily (1 hour, 3 hours, or a custom time)
- Delete the classroom (messages and members are removed with it)

**Personal privacy settings**
- Block screenshots in chat, and toggle new-message alerts
- Light and dark theme toggle

**Premium (RevenueCat)**
- Free users can create up to **3 classrooms**
- Premium users (`premium` entitlement) can create **unlimited** classrooms
- Monthly and yearly plans, purchase and restore flow
- Premium users get a golden **VIP** badge on the Home screen instead of the diamond button

## Tech Stack

- Expo (React Native) and TypeScript
- React Navigation (native stack)
- Firebase Authentication and Cloud Firestore
- RevenueCat (`react-native-purchases`) for subscriptions
- Google Sign-In (`@react-native-google-signin/google-signin`)
- `expo-screen-capture`, AsyncStorage, `expo-image-picker`

## RevenueCat Integration

RanChat uses RevenueCat to gate the number of classrooms a user can create.

- **Entitlement:** `premium`
- **Offering:** one current offering with a Monthly and an Annual package
- **Limit check:** when a user taps *Create Classroom*, the app reads the customer info from RevenueCat. If `premium` is not active, it counts the classrooms the user owns and blocks creation at 3, showing an upgrade prompt
- **Fail-safe:** if the plan can't be verified (for example, no connection), creation is blocked instead of silently allowed
- **Live status:** a small hook listens for customer-info updates, so the Home screen switches to the VIP badge right after a purchase or restore
- **Testing:** developed and tested with the RevenueCat Test Store

## Running the Project

RanChat uses native modules (Google Sign-In, RevenueCat), so it does **not** run in Expo Go. You need a development build.

Clone the repository:

```bash
git clone https://github.com/jeet-biswas-09/RanChat.git
cd RanChat
```

Install dependencies:

```bash
npm install
```

Set up Firebase and RevenueCat (see below), then create a development build:

```bash
eas build --profile development --platform android
```

Install the APK on your device and start the dev server:

```bash
npx expo start --dev-client
```

## Firebase Configuration

The Firebase configuration file is intentionally **not** included in this public repository. To run the project with your own Firebase project:

1. Create a Firebase project.
2. In **Authentication**, enable Email/Password, Anonymous, and Google sign-in.
3. Create a **Cloud Firestore** database.
4. Add an Android app with the package name `com.nstechno.ranchat` (or change the package name in `app.json` to your own) and add your keystore's SHA-1 fingerprint, which Google Sign-In needs.
5. Download `google-services.json` and place it in the project root. It is gitignored.
6. Put your own Firebase web config in `src/services/firebase.ts` and your Web client ID in `src/services/googleSignIn.ts`.

**Building with EAS without committing the file:** upload it as a file environment variable and `app.config.js` will pick it up.

```bash
eas env:create --environment development --name GOOGLE_SERVICES_JSON --type file --value ./google-services.json
```

Make sure the `development` profile in `eas.json` has `"environment": "development"`.

## RevenueCat Configuration

To test purchases with your own RevenueCat project:

1. Create a project and an app (or use the Test Store).
2. Create an entitlement with the identifier `premium`.
3. Create monthly and annual products, attach them to the `premium` entitlement, and add them as packages to the current offering.
4. Set your own public SDK key where `Purchases.configure` is called in the app.

Never commit secret keys (RevenueCat `sk_` keys, keystores, `.env` files).

## Known Limitations

RanChat is a work in progress, and these are the honest gaps at the moment:

- **Database rules are basic.** Firestore rules currently only require a signed-in user. Classroom ownership and membership use a separate anonymous ID from Firebase Auth's `uid`, so ownership is enforced in the app and not yet at the database level. Merging the two ID systems and tightening the rules is a priority.
- **The classroom limit is checked on the client.** A determined user could bypass it. A server-side check would fix this.
- **Only "Unlimited classrooms" is live as a Premium perk.** The other perks listed on the Premium screen (priority delivery, exclusive themes, extended code lifetime, no ads) are planned but not built yet.
- **Media sharing is not built.** The Vault and Shared Media screens are placeholders until a storage option is added.
- **Some settings toggles are UI-only** (for example read receipts and active status).
- **Light theme is not applied to every screen yet.**

## Why I Built RanChat

I have liked computers, coding and development for a long time, and I wanted to build something of my own.

I started RanChat without knowing everything I needed to know. A lot of what I know about development now, I learned while building this project.

It took me 93 days to build RanChat. During that time I worked through frontend and backend problems, learned new technologies, fixed bugs and kept improving the project. Some problems took several days to solve, but I continued working on them until I found a way forward.

RanChat started as an idea, and this repository contains the project I built from that idea.

## What's Next

- Tighter security: unify user IDs and enforce ownership in Firestore rules
- Server-side enforcement of Premium limits
- Build the remaining Premium perks
- Photo and video sharing, with better media management
- Better privacy and anonymous communication
- More safety and moderation features
- Further classroom functionality
- Improving the UI, stability, and overall user experience
- Making RanChat available to more users

## Author

Built independently by Jeet.

## License

This project is licensed under the MIT License.