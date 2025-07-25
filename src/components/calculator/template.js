const template = (context) => {
  return `<div class="calculator__display">
                <div class="calculator__display-branding">
                    <h3 class="calculator__display-branding-brand">${context.brandName}</h3>
                    <h3 class="calculator__display-branding-info">${context.digitCount}</h3>
                </div>
                <div class="calculator__display-output">0</div>
            </div>
            <div class="calculator__body">
                <div class="calculator__body-key" data-operator="add">+</div>
                <div class="calculator__body-key" data-operator="subtract">-</div>
                <div class="calculator__body-key" data-operator="multiply">&times</div>
                <div class="calculator__body-key" data-operator="divide">/</div>
                <div class="calculator__body-key" data-value="7">7</div>
                <div class="calculator__body-key" data-value="8">8</div>
                <div class="calculator__body-key" data-value="9">9</div>
                <div class="calculator__body-key" data-action="clear">CE</div>
                <div class="calculator__body-key" data-value="4">4</div>
                <div class="calculator__body-key" data-value="5">5</div>
                <div class="calculator__body-key" data-value="6">6</div>
                <div class="calculator__body-key calculator__body-equal" data-action="equals">=</div>
                <div class="calculator__body-key" data-value="1">1</div>
                <div class="calculator__body-key" data-value="2">2</div>
                <div class="calculator__body-key" data-value="3">3</div>
                <div class="calculator__body-key calculator__body-zero" data-value="0">0</div>
                <div class="calculator__body-key" data-prefix="point">.</div>

            </div>`;
};

export default template;
