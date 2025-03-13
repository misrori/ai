function chatGPT(prompt) {
  var API_KEY = "sk-proj-";
  var url = "https://api.openai.com/v1/chat/completions";
  
  var payload = {
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 200
  };
  
  var options = {
    method: "post",
    headers: {
      "Authorization": "Bearer " + API_KEY,
      "Content-Type": "application/json"
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var json = JSON.parse(response.getContentText());
  
  return json.choices && json.choices.length > 0 ? json.choices[0].message.content : "Hiba történt!";
}


function chatGPTTable(prompt) {
  var API_KEY = "sk-proj-";
  var url = "https://api.openai.com/v1/chat/completions";
  
  var payload = {
    model: "gpt-4",
    messages: [{ role: "user", content: prompt + "\n\nKérlek, táblázatos formában válaszolj, markdown szintaxissal!" }],
    max_tokens: 1000
  };
  
  var options = {
    method: "post",
    headers: {
      "Authorization": "Bearer " + API_KEY,
      "Content-Type": "application/json"
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var json = JSON.parse(response.getContentText());
  var textResponse = json.choices && json.choices.length > 0 ? json.choices[0].message.content : "Hiba történt!";
  
  return parseMarkdownTable(textResponse);
}

function parseMarkdownTable(mdText) {
  var rows = mdText.split("\n").filter(row => row.includes("|")); // Csak a táblázatsorokat hagyjuk meg
  if (rows.length < 2) return [["Nincs érvényes táblázatos adat!"]];
  
  rows.splice(1, 1); // Az elválasztó sort töröljük (pl. |---|---|)

  return rows.map(row => row.split("|").slice(1, -1).map(cell => cell.trim())); // Oszlopokat levágjuk
}
