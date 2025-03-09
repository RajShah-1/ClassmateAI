import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // For NoteView
  loadingIndicator: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  markdownText: { lineHeight: 24, color: '#444', paddingHorizontal: 4 },

  // For upload
  uploadContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  uploadButton: {
    width: '90%',
    paddingVertical: 10,
  },

  // For LectureDetailsScreen
  summaryContainer: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  summaryText: { fontSize: 16, lineHeight: 22 },
  noteCard: { backgroundColor: '#FFF', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, marginBottom: 10, elevation: 2 },
  noteCardContent: { paddingVertical: 8, paddingHorizontal: 10 },
  noteTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  noteDescription: { fontSize: 14, color: '#666' },
  headerCard: { backgroundColor: '#ECECEC', padding: 20, borderRadius: 12, marginBottom: 16 },
  lectureTitle: { fontSize: 22, fontWeight: 'bold' },
  lectureDetailsButtonColumn: { flexDirection: 'column', marginTop: 8 },
  smallActionButton: { marginTop: 8, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, width: '90%', alignSelf: 'center' },
  // noteSummarySubtext: { fontSize: 12, color: '#333', marginBottom: 5, fontWeight: 'bold' },


  screen: { flex: 1 },
  container: { paddingHorizontal: 16, paddingVertical: 16 },
  card: { marginHorizontal: 16, marginVertical: 8, paddingVertical: 8, paddingHorizontal: 8 },
  cardRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 8 },
  icon: { marginRight: 12 },
  textContainer: { flex: 1 },
  title: { marginBottom: 2 },
  description: { fontSize: 14, color: '#666' },
  meta: { marginTop: 4, fontSize: 13, color: '#999' },
  buttonRow: { flexDirection: 'row' },
  actionButton: { marginTop: 8 },
  aiButton: { margin: 16, borderRadius: 4 },
  uploadBox: {
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: { backgroundColor: 'transparent' },
});
