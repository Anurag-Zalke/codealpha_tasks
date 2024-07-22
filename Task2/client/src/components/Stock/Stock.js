import React from 'react';
import Plot from 'react-plotly.js';


class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      loading: true,
      error: null, 
    };
  }

  componentDidMount() {
    const { symbol } = this.props;
    if (symbol) {
      this.fetchStock(symbol);
    }
  }

  componentDidUpdate(prevProps) {
    const { symbol: prevSymbol } = prevProps;
    const { symbol } = this.props;
    if (symbol !== prevSymbol) {
      this.fetchStock(symbol);
    }
  }

  async fetchStock(symbol) {
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${process.env.API_K}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    try {
      const response = await fetch(API_Call);
      const data = await response.json();

      for (var key in data['Time Series (Daily)']) {
        stockChartXValuesFunction.push(key);
        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
      }

      this.setState({
        stockChartXValues: stockChartXValuesFunction,
        stockChartYValues: stockChartYValuesFunction,
        loading: false, 
        error: null, 
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
      this.setState({
        loading: false, 
        error: 'Error fetching stock data', 
      });
    }
  }

  render() {
    const { stockChartXValues, stockChartYValues, loading, error } = this.state;

    if (loading) {
      return <div className="loading-spinner"></div>; 
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>Stock Market</h1>
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            }
          ]}
          layout={{ width: 720, height: 440, title: 'Stock Chart' }}
        />
      </div>
    );
  }
}

export default Stock;
