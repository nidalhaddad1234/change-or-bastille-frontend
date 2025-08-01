import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useContextStore } from '../stores/RootStoreContext';
import { observer } from 'mobx-react';

const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const MarqueeContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  color: '#FFD700',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  padding: theme.spacing(1, 0),
  position: 'relative',
  zIndex: 1000,
  borderBottom: '1px solid #333',
}));

const MarqueeContent = styled(Box)({
  display: 'inline-block',
  animation: `${scroll} 30s linear infinite`,
  paddingLeft: '100%',
});

const CurrencyMarquee = observer(() => {
  const { currenciesStore } = useContextStore();
  const [featuredCurrencies, setFeaturedCurrencies] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await currenciesStore.loadFeaturedCurrencies();
        setFeaturedCurrencies(currenciesStore.featuredCurrencies);
      } catch (error) {
        console.error('Error loading featured currencies:', error);
      }
    };
    loadData();
  }, [currenciesStore]);

  const formatCurrencyText = (currency) => 
    `${currency.iso}: ${currency.sellPrice}€ • `;

  const defaultCurrencies = [
    { iso: 'USD', sellPrice: '0.92' },
    { iso: 'GBP', sellPrice: '1.15' },
    { iso: 'CHF', sellPrice: '1.05' },
    { iso: 'JPY', sellPrice: '0.0065' }
  ];

  const currenciesToShow = featuredCurrencies.length > 0 ? featuredCurrencies : defaultCurrencies;

  return (
    <MarqueeContainer>
      <MarqueeContent>
        <Typography variant="body2" component="span">
          📈 TAUX DE CHANGE EN TEMPS RÉEL • 
          {currenciesToShow.map((currency, index) => (
            <span key={index}>{formatCurrencyText(currency)}</span>
          ))}
          📊 ACHAT/VENTE AU MEILLEUR COURS • 
          {currenciesToShow.map((currency, index) => (
            <span key={`repeat-${index}`}>{formatCurrencyText(currency)}</span>
          ))}
          💰 CHANGE ET OR BASTILLE - VOTRE EXPERT EN MÉTAUX PRÉCIEUX • 
        </Typography>
      </MarqueeContent>
    </MarqueeContainer>
  );
});

export default CurrencyMarquee;
