// GENERIC UPDATE LOGIC

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVALb = 16.666;

// Dt means "delta time" and is in units of the timer-system (i.e. milliseconds)
//
var g_prevUpdateDtb = null;

// Du means "delta u", where u represents time in multiples of our nominal interval
//
var g_prevUpdateDub = null;

// Track odds and evens for diagnostic / illustrative purposes
//
var g_isUpdateOddb = false;


function updateb(dt) {
    
    // Get out if skipping (e.g. due to pause-mode)
    //
    if (shouldSkipUpdateb()) return;

    // Remember this for later
    //
    var original_dt = dt;
    
    // Warn about very large dt values -- they may lead to error
    //
    if (dt > 200) {
        console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
        dt = NOMINAL_UPDATE_INTERVALb;
    }
    
    // If using variable time, divide the actual delta by the "nominal" rate,
    // giving us a conveniently scaled "du" to work with.
    //
    var du = (dt / NOMINAL_UPDATE_INTERVALb);
    
    updateSimulationb(du);
    
    g_prevUpdateDtb = original_dt;
    g_prevUpdateDub = du;
    
    g_isUpdateOddb = !g_isUpdateOddb;
}

// Togglable Pause Mode
//
var KEY_PAUSE = 'P'.charCodeAt(0);
var KEY_STEP  = 'O'.charCodeAt(0);

var gb_isUpdatePaused = false;

function shouldSkipUpdateb() {
    if (eatKey(KEY_PAUSE)) {
        gb_isUpdatePaused = !gb_isUpdatePaused;
    }
    return gb_isUpdatePaused && !eatKey(KEY_STEP);    
}