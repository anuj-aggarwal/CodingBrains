$(() => {
    const $nameInput = $("#name");
    const $startTimeInput = $("#startTime");
    const $durationInput = $("#duration");

    const $prizeList = $("#prize-list");
    const $addPrizeForm = $("#add-prize-form");
    const $addPrizeInput = $("#add-prize-input");
    const $submitBtn = $("#submitBtn");
    
    // Event Listener for Add Prize Form
    $addPrizeForm.submit(event => {
        event.preventDefault();

        // Get Prize text
        const prizeText = $addPrizeInput.val();
        if (prizeText === "")
            return;
        // Remove Temporary Message if present
        $("#temp-message").remove();
        // Add new Prize
        $prizeList.append(`
            <li class="prize">${prizeText}</li>
        `);
        // Clear Add Prize Input
        $addPrizeInput.val("");
    });
    // Event Listener to remove Prize on Clicking Prize
    $prizeList.on("click", ".prize", event => {
        $(event.currentTarget).remove();
    });

    // Event Listener for Submitting form,
    // and making POST Request to Server for Creation of Contest
    $submitBtn.click(() => {
        // TODO: Validate for all Form Fields
        $.post("/contests", {
            name: $nameInput.val(),
            startTime: $startTimeInput.val(),
            duration: $durationInput.val(),
            prizes: $(".prize").toArray().map(prize => $(prize).text())
        })
         .then(data => {
             window.location = data;
         })
         .catch(err => {
             console.error(err.stack);
         });
    });
});