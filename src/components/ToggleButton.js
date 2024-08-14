import { TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { styles } from "../styles/DashboardScreenStyles";

const SidebarToggleButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.menuButton}>
    <IconButton icon="menu" size={28} style={styles.menuIcon} />
  </TouchableOpacity>
);

export default SidebarToggleButton;
