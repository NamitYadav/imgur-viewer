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
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '8px',
    background: '#474b50',
    maxWidth: '1000px',
  },
  image: {
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#474b50',
    color: '#fff',
    borderRadius: '0 0 4px 4px',
  },
}));

export default useStyles;
