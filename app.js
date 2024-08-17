const url = "https://flag-gilt.vercel.app/api/challenge";

const headers = {
  Authorization: "Bearer uM0M7uypyeeHZ741XIrs9KsFOUEhxUdtXJA=",
  "Content-Type": "application/json",
};

let cursor = "";

async function fetchData() {
  while (true) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ cursor: cursor }),
      });

      if (response.ok) {
        const data = await response.json();

        if (!data.nextCursor) {
          console.log(data);
          break;
        }

        cursor = data.nextCursor;
      } else {
        console.error(
          `Failed to retrieve data: ${response.status} ${response.statusText}`
        );
        break;
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
      console.error(error.stack);
      break;
    }
  }
}

fetchData();
