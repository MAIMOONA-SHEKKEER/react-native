import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  menuButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  menuIcon: {
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 16,
    backgroundColor: '#4B0082',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4B0082',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    color: '#555',
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
});
