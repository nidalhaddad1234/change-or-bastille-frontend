import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Box, 
  Autocomplete, 
  TextField, 
  Typography, 
  Avatar, 
  Chip,
  CircularProgress,
  InputAdornment,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useContextStore } from '../../stores/RootStoreContext';
import { getCountryCode } from '../../helpers';
import { styled } from '@mui/material/styles';

// Styled components for enhanced UI
const SearchContainer = styled(Box)(({ theme }) => ({
  maxWidth: { xs: '280px', sm: '350px', md: '400px' },
  width: '100%',
  position: 'relative',
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    borderRadius: '25px',
    padding: '4px 8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    '&.Mui-focused': {
      boxShadow: '0 4px 16px rgba(255,215,0,0.3)',
    },
    '& fieldset': {
      border: '1px solid #e0e0e0',
    },
    '&:hover fieldset': {
      border: '1px solid #FFD700',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #FFD700',
    },
  },
  '& .MuiInputBase-input': {
    fontSize: '14px',
    padding: '8px 0',
  },
  '& .MuiAutocomplete-endAdornment': {
    display: 'none',
  },
}));

const ResultItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 0',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(255,215,0,0.1)',
    transform: 'translateX(4px)',
  },
}));

const ResultAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
}));

const ResultContent = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
}));

const ResultTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: '#333',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const ResultSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: '#666',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const TypeChip = styled(Chip)(({ theme, itemType }) => ({
  height: '20px',
  fontSize: '10px',
  fontWeight: 600,
  backgroundColor: itemType === 'metal' ? '#FFD700' : '#4CAF50',
  color: itemType === 'metal' ? '#000' : '#fff',
  '& .MuiChip-label': {
    padding: '0 6px',
  },
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  marginTop: '4px',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  border: '1px solid #e0e0e0',
  overflow: 'hidden',
}));

export default observer(function SearchAutoComplete({ onClose, sx = {} }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const store = useContextStore();
  const navigate = useNavigate();

  // Debounced search function
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Perform search across metals and currencies
  const performSearch = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Ensure stores are loaded
      if (!store.metalsStore.isLoaded) {
        await store.metalsStore.loadmetals(true);
      }
      if (!store.currenciesStore.isLoaded) {
        await store.currenciesStore.loadCurrencies(true);
      }

      // Search metals and currencies
      const [metalResults, currencyResults] = await Promise.all([
        store.metalsStore.searchMetals(query),
        Promise.resolve(store.currenciesStore.searchCurrencies(query))
      ]);

      // Combine and limit results
      const combinedResults = [...metalResults, ...currencyResults].slice(0, 8);
      setSearchResults(combinedResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [store.metalsStore, store.currenciesStore]);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce(performSearch, 300),
    [performSearch, debounce]
  );

  // Handle input change
  const handleInputChange = useCallback((event, newValue) => {
    setSearchQuery(newValue);
    if (newValue !== searchQuery) {
      debouncedSearch(newValue);
    }
  }, [searchQuery, debouncedSearch]);

  // Handle option selection
  const handleOptionSelect = useCallback((event, value) => {
    if (!value) return;

    // Navigate based on item type
    let url = '';
    switch (value.type) {
      case 'metal':
        // Determine metal category for navigation
        if (value.type === 'investmentCoin') {
          url = `/pieces-or-investissement/${value._id}`;
        } else if (value.type === 'collectionCoin') {
          url = `/pieces-or-collection/${value._id}`;
        } else if (value.type === 'ingot') {
          url = `/lingots-lingotins-or/${value._id}`;
        } else {
          // Default to investment coins
          url = `/pieces-or-investissement/${value._id}`;
        }
        break;
      case 'currency':
        url = `/cours-des-devises/${value._id}`;
        break;
      default:
        console.warn('Unknown item type:', value.type);
        return;
    }

    navigate(url);
    setSearchQuery('');
    setSearchResults([]);
    setOpen(false);
    
    // Call onClose if provided (for mobile menu)
    if (onClose) {
      onClose();
    }
  }, [navigate, onClose]);

  // Clear search when component unmounts or query is empty
  useEffect(() => {
    if (searchQuery.length === 0) {
      setSearchResults([]);
      store.metalsStore.clearSearchResults();
      store.currenciesStore.clearSearchResults();
    }
  }, [searchQuery, store.metalsStore, store.currenciesStore]);

  // Handle open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Custom option label function
  const getOptionLabel = (option) => {
    if (typeof option === 'string') return option;
    return option.displayName || option.metalName || option.currencyName || '';
  };

  // Custom render option function
  const renderOption = (props, option) => {
    const getImageSrc = () => {
      if (option.type === 'metal' && option.photo) {
        return option.photo;
      }
      if (option.type === 'currency' && option.iso) {
        return `https://flagsapi.com/${getCountryCode(option.iso.toUpperCase())}/flat/64.png`;
      }
      return '/logo.webp'; // Use existing logo as fallback
    };

    const getSubtitle = () => {
      if (option.type === 'metal') {
        return `${option.fabricant || 'Métal'} • ${option.weight || 'N/A'}g`;
      }
      if (option.type === 'currency') {
        return `${option.iso || 'N/A'} • ${option.moneyName || 'Devise'}`;
      }
      return '';
    };

    return (
      <ResultItem {...props} key={option._id}>
        <ResultAvatar
          src={getImageSrc()}
          alt={option.displayName}
          variant="rounded"
        />
        <ResultContent>
          <ResultTitle>{option.displayName}</ResultTitle>
          <ResultSubtitle>{getSubtitle()}</ResultSubtitle>
        </ResultContent>
        <TypeChip 
          itemType={option.type}
          label={option.type === 'metal' ? 'Métal' : 'Devise'}
          size="small"
        />
      </ResultItem>
    );
  };

  return (
    <SearchContainer sx={sx}>
      <StyledAutocomplete
        freeSolo
        options={searchResults}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
        inputValue={searchQuery}
        onInputChange={handleInputChange}
        onChange={handleOptionSelect}
        open={open && (searchResults.length > 0 || isLoading)}
        onOpen={handleOpen}
        onClose={handleClose}
        loading={isLoading}
        loadingText="Recherche en cours..."
        noOptionsText="Aucun résultat trouvé"
        PaperComponent={CustomPaper}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Rechercher des métaux ou devises..."
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#666', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="primary" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </SearchContainer>
  );
});
