// PDF generation utility for property reports
// In production, consider using a more robust solution like jsPDF or Puppeteer

export interface PropertyData {
  address: string;
  strategy: string;
  basicInfo: any;
  financials: any;
  aiInsights: any;
  marketData: any;
  timestamp: string;
}

export function generateReportHTML(propertyData: PropertyData): string {
  const { basicInfo, financials, aiInsights, marketData } = propertyData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(1)}%`;
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Property Analysis Report - ${propertyData.address}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #3B82F6;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .property-title {
          font-size: 24px;
          font-weight: bold;
          color: #1F2937;
          margin-bottom: 10px;
        }
        .deal-score {
          font-size: 48px;
          font-weight: bold;
          color: #3B82F6;
          margin: 10px 0;
        }
        .section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #1F2937;
          margin-bottom: 15px;
          border-bottom: 1px solid #E5E7EB;
          padding-bottom: 5px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 15px;
        }
        .metric {
          text-align: center;
          padding: 10px;
          background-color: #F9FAFB;
          border-radius: 6px;
        }
        .metric-value {
          font-size: 20px;
          font-weight: bold;
          color: #1F2937;
        }
        .metric-label {
          font-size: 12px;
          color: #6B7280;
          text-transform: uppercase;
        }
        .insight-summary {
          background-color: #EFF6FF;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
          font-style: italic;
        }
        .strengths { color: #059669; }
        .risks { color: #DC2626; }
        .recommendations { color: #3B82F6; }
        ul {
          padding-left: 20px;
        }
        li {
          margin-bottom: 5px;
        }
        .red-flag {
          background-color: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 20px;
        }
        .red-flag h4 {
          color: #DC2626;
          margin-top: 0;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #E5E7EB;
          text-align: center;
          font-size: 12px;
          color: #6B7280;
        }
        .valuation-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .undervalued { background-color: #D1FAE5; color: #065F46; }
        .overvalued { background-color: #FEE2E2; color: #991B1B; }
        .market { background-color: #F3F4F6; color: #374151; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="property-title">${propertyData.address}</div>
        <div style="color: #6B7280; margin-bottom: 10px;">Investment Strategy: ${propertyData.strategy.toUpperCase()}</div>
        <div class="deal-score">${aiInsights.dealScore}/10</div>
        <div style="color: #6B7280;">AI Deal Score</div>
      </div>

      <div class="section">
        <div class="section-title">Property Details</div>
        <div class="grid">
          <div class="metric">
            <div class="metric-value">${formatCurrency(basicInfo.price)}</div>
            <div class="metric-label">List Price</div>
          </div>
          <div class="metric">
            <div class="metric-value">${basicInfo.bedrooms}/${basicInfo.bathrooms}</div>
            <div class="metric-label">Bed/Bath</div>
          </div>
          <div class="metric">
            <div class="metric-value">${basicInfo.sqft.toLocaleString()}</div>
            <div class="metric-label">Square Feet</div>
          </div>
          <div class="metric">
            <div class="metric-value">${basicInfo.yearBuilt}</div>
            <div class="metric-label">Year Built</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Financial Analysis</div>
        <div class="grid">
          <div class="metric">
            <div class="metric-value" style="color: #059669;">${formatCurrency(financials.cashFlow)}</div>
            <div class="metric-label">Monthly Cash Flow</div>
          </div>
          <div class="metric">
            <div class="metric-value">${formatPercent(financials.capRate)}</div>
            <div class="metric-label">Cap Rate</div>
          </div>
          <div class="metric">
            <div class="metric-value">${formatPercent(financials.cashOnCashReturn)}</div>
            <div class="metric-label">Cash-on-Cash Return</div>
          </div>
          <div class="metric">
            <div class="metric-value">${formatPercent(financials.roi)}</div>
            <div class="metric-label">Total ROI</div>
          </div>
        </div>
        <div style="margin-top: 15px;">
          <strong>Estimated Rent Range:</strong> ${formatCurrency(financials.estimatedRentRange.min)} - ${formatCurrency(financials.estimatedRentRange.max)}<br>
          <strong>Monthly Expenses:</strong> ${formatCurrency(financials.monthlyExpenses)}
        </div>
      </div>

      <div class="section">
        <div class="section-title">AI Investment Analysis</div>
        
        <div class="insight-summary">
          ${aiInsights.summary}
        </div>

        <div style="margin-bottom: 20px;">
          <strong>Valuation Assessment:</strong> 
          <span class="valuation-badge ${aiInsights.valuationAssessment}">${aiInsights.valuationAssessment || 'Market Value'}</span>
          <br><br>
          <strong>Financing Options:</strong> ${aiInsights.financingLikelihood || 'Conventional Only'}
        </div>

        ${aiInsights.topRedFlag ? `
          <div class="red-flag">
            <h4>⚠️ Top Red Flag</h4>
            <p>${aiInsights.topRedFlag}</p>
          </div>
        ` : ''}

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
          <div>
            <h4 class="strengths">✅ Strengths</h4>
            <ul>
              ${aiInsights.strengths?.map((strength: string) => `<li>${strength}</li>`).join('') || ''}
            </ul>
          </div>
          <div>
            <h4 class="risks">⚠️ Risks</h4>
            <ul>
              ${aiInsights.risks?.map((risk: string) => `<li>${risk}</li>`).join('') || ''}
            </ul>
          </div>
          <div>
            <h4 class="recommendations">💡 Next Steps</h4>
            <ul>
              ${aiInsights.recommendations?.map((rec: string) => `<li>${rec}</li>`).join('') || ''}
            </ul>
          </div>
        </div>

        ${aiInsights.exitStrategy ? `
          <div style="margin-top: 20px; padding: 15px; background-color: #DBEAFE; border-radius: 6px;">
            <h4 style="color: #1E40AF; margin-top: 0;">🎯 Recommended Exit Strategy</h4>
            <p style="margin-bottom: 0;">${aiInsights.exitStrategy}</p>
          </div>
        ` : ''}
      </div>

      <div class="section">
        <div class="section-title">Market Context</div>
        <div class="grid">
          <div class="metric">
            <div class="metric-value">${formatCurrency(marketData.medianPrice)}</div>
            <div class="metric-label">Median Price</div>
          </div>
          <div class="metric">
            <div class="metric-value" style="color: #059669;">+${formatPercent(marketData.priceAppreciation)}</div>
            <div class="metric-label">YoY Appreciation</div>
          </div>
          <div class="metric">
            <div class="metric-value">${marketData.daysOnMarket}</div>
            <div class="metric-label">Avg Days on Market</div>
          </div>
        </div>

        <h4>Recent Comparable Sales</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background-color: #F9FAFB;">
              <th style="padding: 8px; text-align: left; border: 1px solid #E5E7EB;">Address</th>
              <th style="padding: 8px; text-align: left; border: 1px solid #E5E7EB;">Price</th>
              <th style="padding: 8px; text-align: left; border: 1px solid #E5E7EB;">Sq Ft</th>
              <th style="padding: 8px; text-align: left; border: 1px solid #E5E7EB;">Price/Sq Ft</th>
            </tr>
          </thead>
          <tbody>
            ${marketData.comparables?.map((comp: any) => `
              <tr>
                <td style="padding: 8px; border: 1px solid #E5E7EB;">${comp.address}</td>
                <td style="padding: 8px; border: 1px solid #E5E7EB;">${formatCurrency(comp.price)}</td>
                <td style="padding: 8px; border: 1px solid #E5E7EB;">${comp.sqft.toLocaleString()}</td>
                <td style="padding: 8px; border: 1px solid #E5E7EB;">$${comp.pricePerSqft}</td>
              </tr>
            `).join('') || ''}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>Report generated on ${new Date(propertyData.timestamp).toLocaleDateString()}</p>
        <p>Powered by Property AI • AI analysis by Claude 3 Haiku • Real estate data by Estated API</p>
        <p style="margin-top: 10px; font-style: italic;">
          This report is for informational purposes only and should not be considered as investment advice. 
          Always conduct your own due diligence before making investment decisions.
        </p>
      </div>
    </body>
    </html>
  `;
}

export function downloadPDF(propertyData: PropertyData) {
  const htmlContent = generateReportHTML(propertyData);
  
  // Create a blob with the HTML content
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link and click it to download
  const link = document.createElement('a');
  link.href = url;
  link.download = `property-analysis-${propertyData.address.replace(/[^a-zA-Z0-9]/g, '-')}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL
  URL.revokeObjectURL(url);
}

export function shareReport(propertyData: PropertyData) {
  const shareData = {
    title: `Property Analysis: ${propertyData.address}`,
    text: `Check out this property analysis - Deal Score: ${propertyData.aiInsights.dealScore}/10`,
    url: window.location.href
  };

  if (navigator.share && navigator.canShare(shareData)) {
    navigator.share(shareData);
  } else {
    // Fallback to copying URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Report URL copied to clipboard!');
    });
  }
}