/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import camera from "../assets/icons/camera.png";
import avatar from "../assets/icons/generic-avatar.png";
import image from "../assets/icons/image.png";
import phone from "../assets/icons/phone-call.png";
import atsign from "../assets/icons/at-sign.png"
import eye from "../assets/icons/eye.png"
import globe from "../assets/icons/globe.png"
import home from "../assets/icons/home.png"
import search from "../assets/icons/search.png"

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';


export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

 export default{
  camera,
  avatar,
  image,
  phone,
  atsign,
  eye,
  globe,
  home,
  search,
 }