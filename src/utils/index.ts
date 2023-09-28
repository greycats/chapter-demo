import axios from "axios";

const fetchFile = async (url: string) => {
  return axios
    .get(url, {
      responseType: "json",
    })
    .then((resp) => {
      // console.log(resp);
      return resp.data;
    });
};

const stringToSeconds = (timeStamp: string) => {
  const [hours, minutes, seconds] = timeStamp.split(".")[0].split(":").map(Number);
  return hours * 60 * 60 + minutes * 60 + seconds;
};

export const generateProgressBarChapters = async (fileUrl: string) => {
  const resp = await fetchFile(fileUrl);
  const chapters = resp.split("\n\n").slice(1);
  return chapters.map((item: string) => {
    const [timeStr, label] = item.split("\n").map((str: string) => str.trim());
    const time = stringToSeconds(timeStr.split("-->").map((str: string) => str.trim())[0]);
    return {
      time,
      label,
    };
  });
};

export const txt2VttString = async () => {
  const resp = await fetchFile(`${process.env.PUBLIC_URL}/chapters/toc-44.txt`);
  const list = resp
    .split("\n\n")
    .slice(1)
    .map((item: string, index: number) => {
      console.log(item);
      const line = item.split(" 00:").map((str: string) => str.replace("/n", "").trim());
      console.log(line);
      line[1] = `00:${line[1]}`;
      return line;
    });
  let string = "";
  for (let i = 0; i < list.length; i++) {
    const [text, timeStr] = list[i];
    if (i) {
      const previousItem = list[i - 1];
      string = `${string}

${previousItem[1]} --> ${timeStr}
${text}`;
    } else {
      string = `WEBVTT

00:00:00.000 --> ${timeStr}
${text}`;
    }
  }
  console.log(string);
};
