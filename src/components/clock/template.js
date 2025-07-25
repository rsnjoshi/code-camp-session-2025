const template = (context) => `
    <div class="clock__frame">
        <div class="hour">12</div>
        <div class="tick">:</div>
        <div class="minute">12</div>
        <div class="tick">:</div>
        <div class="second">12</div>
        <div class="meridiem">AM</div>
    </div>

    <div class="clock_buttons" style="display: ${
      context.areButtonsVisible ? "block" : "none"
    };">
        <button class="reset">Reset</button>
        <button class="start">Start</button>
        <button class="stop">Stop</button>
    </div>

`;

export default template;
