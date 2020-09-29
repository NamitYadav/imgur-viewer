import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  progressContainer: {
    background: '#2d3135',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    padding: '16px 80px',
    justifyContent: 'flex-start',
    background: '#2d3135',
    minHeight: '100vh',
    '@media (max-width: 720px)': {
      padding: '16px',
      paddingTop: '224px',
    },
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    flex: '1',
    color: '#2d3135',
  },
  grid: {
    marginTop: '80px',
  },
  Row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0 0.5rem',
    boxSizing: 'border-box',
    marginBottom: '20px',
  },
  Item: {
    width: '340px',
    height: '305px',
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '15px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.04)',
      transition: 'all 0.3s ease',
    },
  },
  image: {
    width: '100%',
    height: '250px',
    overflow: 'hidden',
  },
  listTitle: {
    fontWeight: 'bold',
    padding: '8px',
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#474b50',
    color: '#fff',
    borderRadius: '0 0 4px 4px',
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    width: '100%',
    '@media (max-width: 720px)': {
      flexDirection: 'column',
    },
  },
  formControl: {
    minWidth: '120px !important',
    margin: '0 16px 0 0 !important',
    '@media (max-width: 720px)': {
      marginBottom: '8px !important',
    },
  },
  emptyDiv: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    color: '#fff',
  },
}));

export default useStyles;
