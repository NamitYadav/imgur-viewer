import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  progressContainer: {
    background: '#2d3135',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: '64px',
    background: '#2d3135',
    minHeight: '100vh',
    boxSizing: 'border-box',
    '@media (max-width: 720px)': {
      padding: '16px',
    },
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'flex-start',
    marginBottom: '16px',
  },
  card: {
    padding: '8px',
    background: '#474b50',
    maxWidth: '1000px',
    maxHeight: '500px',
  },
  image: {
    width: '100%',
  },
  infoContainer: {
    background: '#474b50',
    color: '#fff',
    borderRadius: '0 0 4px 4px',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
  },
  titleBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '20px',
  },
}));

export default useStyles;
