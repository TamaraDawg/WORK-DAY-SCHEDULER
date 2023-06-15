console.log($);
console.log(dayjs);



$(function () {
  // Function to display the current date in the header of the page
  function displayCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  // Function to generate time blocks for standard business hours
  function generateTimeBlocks() {
    var startTime = 9; // Start time (9am)
    var endTime = 17; // End time (5pm)

    var container = $(".container-fluid");

    for (var hour = startTime; hour <= endTime; hour++) {
      var timeBlock = $("<div>").addClass("row time-block").attr("id", "hour-" + hour);
      var hourCol = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(formatHour(hour));
      var descriptionCol = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");
      var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save")
        .html('<i class="fas fa-save" aria-hidden="true"></i>');

      timeBlock.append(hourCol, descriptionCol, saveBtn);
      container.append(timeBlock);
    }
  }

  // Function to format the hour for display
  function formatHour(hour) {
    var formattedHour = hour % 12 || 12;
    var amPm = hour < 12 ? "AM" : "PM";
    return formattedHour + amPm;
  }

  // Function to apply the past, present, or future class to each time block
  function applyTimeBlockClasses() {
    var currentHour = dayjs().format("H");
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour == currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }
  

  // Function to load saved events from local storage
  function loadSavedEvents() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedEvent = localStorage.getItem(blockId);

      if (savedEvent) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }

  // Function to save events to local storage when the save button is clicked
  $(".saveBtn").on("click", function () {
    var blockId = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings("textarea").val();

    localStorage.setItem(blockId, eventText);
  });

  // Call the necessary functions to initialize the page
  displayCurrentDate();
  generateTimeBlocks();
  
  loadSavedEvents();
  applyTimeBlockClasses();
});
