console.log("Hello from DS14!");

//initialise var and later actually set it
let viz;

//Create a var for the url
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en&:display_count=y&:origin=viz_share_link";

//Create a var for the vizContainer
const vizContainer = document.getElementById("vizContainer");

//Create a var for the viz options
const options = {
  device: "desktop",
  hideTabs: true,
};

const hideButton = document.getElementById("hideButton");
hideButton.addEventListener("click", function () {
  viz.hide();

  showButton.style.display = "inline";
  hideButton.style.display = "none";
});

const showButton = document.getElementById("showButton");
showButton.addEventListener("click", function () {
  viz.show();
  showButton.style.display = "none";
  hideButton.style.display = "inline";
});

const pdfButton = document.getElementById("pdfButton");
pdfButton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

const pptButton = document.getElementById("pptButton");
pptButton.addEventListener("click", function () {
  viz.showExportPowerPointDialog();
});

const crosstabButton = document.getElementById("crosstabButton");
crosstabButton.addEventListener("click", function () {
  viz.showExportCrossTabDialog();
});

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
  showButton.style.display = "none";
}

function getRangeValues() {
  // get the values from the inputs
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  //console.log(minValue, maxValue);
  //get the workbook
  const workbook = viz.getWorkbook();

  //get active sheet - dashboard
  const activeSheet = workbook.getActiveSheet();

  //get all sheets in the dashboard
  const sheets = activeSheet.getWorksheets();

  //apply filter to the sheet with the sales measure
  const sheetToFilter = sheets[1];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: +minValue,
    max: +maxValue,
  });
}

document.getElementById("filterButton").addEventListener("click", function () {
  getRangeValues();
});

document.addEventListener("DOMContentLoaded", initViz);
