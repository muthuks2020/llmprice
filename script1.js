// Example data: Prices per token (in USD) for various LLM APIs
const apiPricingData = [
    {
        provider: 'Google', 
        model: 'Gemini', 
        inputPricePerThousandTokens: 0.00035,
        outputPricePerThousandTokens: 0.00105,
        calculateCost: function(inputTokens, outputTokens) {
            const inputCost = (inputTokens / 1000) * this.inputPricePerThousandTokens;
            const outputCost = (outputTokens / 1000) * this.outputPricePerThousandTokens;
            return inputCost + outputCost;
        }
    },
    {
        provider: 'Anthropic',
        model: 'Claude 3 Sonnet',
        inputPricePerThousandTokens: 0.003,
        outputPricePerThousandTokens: 0.015,
        calculateCost: function(inputTokens, outputTokens) {
            const inputCost = (inputTokens / 1000) * this.inputPricePerThousandTokens;
            const outputCost = (outputTokens / 1000) * this.outputPricePerThousandTokens;
            return inputCost + outputCost;
        }
    },
    {
        provider: 'OpenAI',
        model: 'GPT-4',
        inputPricePerThousandTokens: 0.00015,
        outputPricePerThousandTokens: 0.0006,
        calculateCost: function(inputTokens, outputTokens) {
            const inputCost = (inputTokens / 1000) * this.inputPricePerThousandTokens;
            const outputCost = (outputTokens / 1000) * this.outputPricePerThousandTokens;
            return inputCost + outputCost;
        }
    },
    {
        provider: 'Mate',
        model: 'Llama 3',
        inputPricePerThousandTokens: 0.00059,
        outputPricePerThousandTokens: 0.00378,
        calculateCost: function(inputTokens, outputTokens) {
            const inputCost = (inputTokens / 1000) * this.inputPricePerThousandTokens;
            const outputCost = (outputTokens / 1000) * this.outputPricePerThousandTokens;
            return inputCost + outputCost;
        }
    },
    // Add more providers as needed
];

// Function to populate the table with the pricing data
function populateTable() {
    const tableBody = document.getElementById('api-table-body');
    tableBody.innerHTML = '';

    apiPricingData.forEach((api, index) => {
        let row = `
            <tr>
                <td>${api.provider}</td>
                <td>${api.model}</td>
                <td>Input: $${api.inputPricePerThousandTokens.toFixed(6)} / 1000 tokens<br>Output: $${api.outputPricePerThousandTokens.toFixed(6)} / 1000 tokens</td>
                <td><input type="number" class="form-control" id="inputTokens-${index}" placeholder="Enter input tokens used"></td>
                <td><input type="number" class="form-control" id="outputTokens-${index}" placeholder="Enter output tokens used"></td>
                <td id="total-${index}">$0.00</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Function to calculate the total cost for each provider
function calculateTotalCost() {
    apiPricingData.forEach((api, index) => {
        const inputTokens = parseInt(document.getElementById(`inputTokens-${index}`).value) || 0;
        const outputTokens = parseInt(document.getElementById(`outputTokens-${index}`).value) || 0;
        const totalCost = api.calculateCost(inputTokens, outputTokens);
        document.getElementById(`total-${index}`).innerText = `$${totalCost.toFixed(2)}`;
    });
}

// Populate the table on page load
populateTable();
