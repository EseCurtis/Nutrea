
# Nutrea App Design Brief

## Overview:
Nutrea is an app designed to help users remember to eat and suggest the best combination of foods each day based on the foods they list. The app will be built using Next.js and aims to provide users with a seamless experience in managing their daily nutrition.

## Brand Elements:

### Brand Name:
**Nutrea**

### Typography:
- **Headings:** Montserrat Bold, 700
- **Body Text:** Roboto Regular, 400

---

## App Interface Overview:

### 1. Onboarding Screen:
- **Purpose:** Introduce the app's features and benefits.
- **Design:** 
  - Simple, visually engaging slides with brief descriptions.
  - Option to skip or proceed.
- **User Input:** Gather basic information like dietary preferences, allergies, and daily nutritional goals.

### 2. Home Screen (Dashboard):
- **Purpose:** Central hub for daily meal suggestions, reminders, and tracking.
- **Design:** 
  - **Top Section:** Displays the current date, with a progress bar showing the user's daily nutrition goal completion.
  - **Middle Section:** 
    - **Today's Meal Plan:** List of suggested meals with portion sizes, divided by breakfast, lunch, dinner, and snacks.
    - **Meal Icons:** Visually represent each meal with a food image or icon.
  - **Bottom Section:** 
    - **Quick Actions:** Buttons for "Add Food", "View History", and "Settings".
- **UX Considerations:** Ensure easy navigation with a clean layout and prominent action buttons.

### 3. Meal Suggestion Screen:
- **Purpose:** Display detailed meal combinations based on user input.
- **Design:**
  - **Top Section:** Nutritional summary for the meal (calories, macronutrients, etc.).
  - **Middle Section:** Suggested food items with portion sizes, nutritional breakdown, and an "Accept" or "Modify" option.
  - **Bottom Section:** Option to add or replace foods from the user's list, with a search bar for easy selection.
- **UX Considerations:** Allow users to easily modify suggestions and see real-time nutritional updates.

### 4. Food List Screen:
- **Purpose:** Manage the user's available food list.
- **Design:**
  - **Top Section:** Search bar and filters (e.g., categories, nutritional value).
  - **Middle Section:** List of user-added foods with nutritional info and quantity.
  - **Bottom Section:** Option to add new foods manually or scan a barcode.
- **UX Considerations:** Ensure a simple flow for adding, editing, and removing food items.

### 5. Reminders & Notifications:
- **Purpose:** Remind users to eat and suggest meals at optimal times.
- **Design:** 
  - **Pop-up Notifications:** Display reminders with the meal name and a quick view of the suggested foods.
  - **In-App Reminder Tab:** Centralized list of upcoming and past reminders, with options to reschedule or dismiss.
- **UX Considerations:** Ensure reminders are non-intrusive but visible, with easy-to-snooze or dismiss options.

### 6. User Profile & Settings:
- **Purpose:** Manage user preferences, dietary goals, and app settings.
- **Design:** 
  - **Profile Section:** Edit personal details, dietary preferences, and daily nutritional goals.
  - **Settings Section:** Manage app notifications, integrations (e.g., wearables), and privacy settings.
- **UX Considerations:** Make it intuitive to adjust settings with clear labeling and toggles.

---

## App Algorithm:

1. **User Input:**
   - Users list the foods they have available.
   - Optionally input dietary preferences, restrictions, and daily caloric goals.

2. **Nutritional Database:**
   - Access a comprehensive nutritional database to retrieve detailed nutritional information about the listed foods.

3. **Meal Suggestion Engine:**
   - **Daily Nutritional Goals:** Calculate the user's daily nutritional needs based on their age, gender, weight, and activity level.
   - **Optimal Combinations:** Analyze the nutritional content of the listed foods to suggest balanced meal combinations.
   - **Meal Timing:** Suggest meal times to ensure consistent energy levels throughout the day, incorporating reminders.

4. **Meal Plan Generation:**
   - Generate a daily meal plan with portion sizes based on the best combinations of the listed foods.
   - Offer alternative suggestions if the user doesn’t like a particular combination.

5. **Reminders & Tracking:**
   - Send reminders to eat based on the user's meal plan and preferences.
   - Allow users to log what they actually ate, offering suggestions for the next meal if they deviate from the plan.

6. **Feedback Loop:**
   - Adjust future meal suggestions based on user feedback and logged meals, making the algorithm smarter over time.

7. **Integration with Wearables (Optional):**
   - Sync data from wearable devices to adjust caloric needs and meal suggestions based on activity levels.

