// Import necessary modules and components
import { StatusBar } from "expo-status-bar"; // For managing the status bar style
import { Tabs, Redirect } from "expo-router"; // For setting up tab navigation
import { Image, Text, View } from "react-native"; // For React Native components
import search from "../../assets/icons/search.png"; // Import the search icon image
import eye from "../../assets/icons/eye.png"; // Import the eye icon image
import home from "../../assets/icons/home.png";

// Component to render tab icons with labels
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* Render the icon image with dynamic tint color */}
      <Image
        source={icon}
        resizeMode="contain" // Ensure the image maintains its aspect ratio
        style={{ width: 24, height: 24, tintColor: color }} // Style the icon size and color
      />
      {/* Render the tab name with dynamic color */}
      <Text style={{ color: color, fontSize: 12, marginTop: 4 }}>
        {name}
      </Text>
    </View>
  );
};

// Component to set up the tab layout for the application
const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001", // Color of the active tab icon
          tabBarInactiveTintColor: "#CDCDE0", // Color of the inactive tab icon
          tabBarShowLabel: false, // Hide the labels of the tabs
          tabBarStyle: {
            backgroundColor: "#161622", // Background color of the tab bar
            borderTopWidth: 1, // Width of the top border of the tab bar
            borderTopColor: "#232533", // Color of the top border of the tab bar
            height: 84, // Height of the tab bar
          },
        }}
      >
        {/* Define the 'found' tab */}
        <Tabs.Screen
          name="found" // Name of the route for the tab
          options={{
            title: "Found", // Title of the tab
            headerShown: false, // Hide the header for this tab
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={search} // Icon for the 'found' tab
                color={color} // Color for the icon based on focus state
                name="Found" // Name of the tab
                focused={focused} // Whether the tab is currently focused
              />
            ),
          }}
        />
        <Tabs.Screen
          name="welcome" // Name of the route for the tab
          options={{
            title: "Home", // Title of the tab
            headerShown: false, // Hide the header for this tab
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={home} // Icon for the 'found' tab
                color={color} // Color for the icon based on focus state
                name="Home" // Name of the tab
                focused={focused} // Whether the tab is currently focused
              />
            ),
          }}
        />
        {/* Define the 'lost' tab */}
        <Tabs.Screen
          name="lost" // Name of the route for the tab
          options={{
            title: "Lost", // Title of the tab
            headerShown: false, // Hide the header for this tab
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={eye} // Icon for the 'lost' tab
                color={color} // Color for the icon based on focus state
                name="Lost" // Name of the tab
                focused={focused} // Whether the tab is currently focused
              />
            ),
          }}
        />
      </Tabs>

      {/* Set up the status bar with custom background color and light text style */}
      <StatusBar style="auto" />
    </>
  );
};

// Export the TabLayout component as default
export default TabLayout;