document.addEventListener("DOMContentLoaded", () => {
  const characters = {
    gushiye: {
      key: "gushiye",
      name: "顾时夜",
      avatar: "images/gushiye.PNG",
      promptPath: "prompt/gushiye.txt",
      intro: "沉稳、克制、安静的陪伴。会在你混乱的时候，替你把事情慢慢理顺。",
      welcome: "回来了？茶刚泡好，温度正好。外面的事都处理完了，现在……把时间留给我，嗯？",
      status: "正在陪你学习",
      voice: { rate: 0.86, pitch: 0.82, volume: 0.9 },
      defaultReplies: [
        "我在。先从最简单的一步开始。",
        "别急，今天只要完成一小段，就已经很好。",
        "如果走神了，也不用责备自己，慢慢把注意力带回来。",
        "你不需要一次解决所有事情。先把眼前这一分钟过好。",
      ],
    },
    yiyu: {
      key: "yiyu",
      name: "易遇",
      avatar: "images/yiyu.PNG",
      promptPath: "prompt/yiyu.txt",
      intro: "温柔、轻声、偏安抚型的陪伴。适合疲惫、低落、需要被接住的时候。",
      welcome: "真巧，我也正想着你，你就出现了。看来……我们的缘分，比我想象的还要深呢。",
      status: "温柔陪伴中",
      voice: { rate: 0.94, pitch: 1.05, volume: 0.9 },
      defaultReplies: [
        "先深呼吸一下，好吗？",
        "这一页看完，我们就休息几分钟。",
        "你不用一下子做到最好，能继续就已经很棒了。",
        "慢慢来，我会陪你一起把状态找回来。",
      ],
    },
    baiyuan: {
      key: "baiyuan",
      name: "柏源",
      avatar: "images/baiyuan.PNG",
      promptPath: "prompt/baiyuan.txt",
      intro: "理性、稳定、擅长拆解问题。适合需要计划和秩序的时候。",
      welcome: "看到你的那一刻，我觉得今天的阳光都变好了。来吧，不管是冒险还是休息，我都听你的。",
      status: "正在整理计划",
      voice: { rate: 0.9, pitch: 0.92, volume: 0.9 },
      defaultReplies: [
        "先做最容易的一件事。",
        "任务太多的时候，就先把它们拆开。",
        "你已经在往前走了，这就足够重要。",
        "先别看终点，我们只处理下一步。",
      ],
    },
    xiaxiaoyin: {
      key: "xiaxiaoyin",
      name: "夏萧因",
      avatar: "images/xiaxiaoyin.PNG",
      promptPath: "prompt/xiaxiaoyin.txt",
      intro: "轻柔、治愈、像陪你休息的朋友。适合焦虑、疲惫、想放松的时候。",
      welcome: "哼，你也知道来找我？……别误会，我只是刚好路过这里，顺便看看你这个笨蛋有没有把自己弄丢。",
      status: "正在陪你放松",
      voice: { rate: 0.98, pitch: 1.12, volume: 0.88 },
      defaultReplies: [
        "先把肩膀放下来。",
        "休息不是浪费时间，是恢复能量。",
        "等你准备好了，我们再继续。",
        "你可以先停一会儿，我会在这里。",
      ],
    },
  };

  const modes = {
    study: {
      label: "伴学模式",
      sideText: "伴学中",
      scene: "current/study.PNG",
      title: "今晚，先完成一段真正的积累。",
      subtitle: "他在这里，陪你把今天慢慢推进。",
      timer: 25 * 60,
      hint: "专注时长 25 分钟",
      focusLabel: "FOCUS TIMER",
    },
    sport: {
      label: "运动模式",
      sideText: "运动中",
      scene: "current/sport.PNG",
      title: "先动起来，状态就会慢慢回来。",
      subtitle: "一点点活动身体，也是在照顾自己。",
      timer: 10 * 60,
      hint: "轻运动 10 分钟",
      focusLabel: "MOVE TIMER",
    },
    rest: {
      label: "休息模式",
      sideText: "休息中",
      scene: "current/rest.PNG",
      title: "先让心安静下来，再继续也不迟。",
      subtitle: "休息不是停下，是为了更稳地继续。",
      timer: 5 * 60,
      hint: "休息 5 分钟",
      focusLabel: "REST TIMER",
    },
    talk: {
      label: "对话模式",
      sideText: "对话中",
      scene: "current/talk.PNG",
      title: "如果今天有点累，也可以先说出来。",
      subtitle: "我会在这里听你慢慢说。",
      timer: 0,
      hint: "情绪对话",
      focusLabel: "CHAT MODE",
    },
  };

  const emotionKeywords = {
    unhappy: [
      "不开心", "不高兴", "心情不好", "不快乐", "emo", "低气压",
      "闷闷的", "心里堵", "堵得慌", "没劲", "提不起劲", "不想说话",
      "有点烦", "不舒坦", "没心情", "空落落", "烦闷", "心烦"
    ],
    anxiety: [
      "焦虑", "紧张", "心慌", "不安", "压力大", "喘不过气",
      "慌", "害怕", "担心", "很急", "坐立不安", "恐慌"
    ],
    sad: [
      "难过", "伤心", "委屈", "失落", "低落", "想哭", "破防",
      "心酸", "鼻子酸", "心里难受", "很丧", "心碎"
    ],
    tired: [
      "累", "好累", "疲惫", "困", "没力气", "撑不住", "精疲力尽",
      "倦", "倦了", "想睡", "不想动", "乏了"
    ],
    studyBlock: [
      "学不进去", "看不进去", "背不下", "背不进去", "走神",
      "拖延", "不想学", "效率低", "做不下去", "写不动", "卡住了",
      "记不住", "不会", "脑子乱"
    ],
    selfDoubt: [
      "我不行", "我好差", "没用", "废物", "失败", "比不上",
      "做不好", "讨厌自己", "我不配", "我太差了", "太笨了"
    ],
    lonely: [
      "孤独", "没人陪", "一个人", "没人懂", "好孤单",
      "被丢下", "不被理解", "很空", "没人说话"
    ],
    angry: [
      "烦", "烦躁", "生气", "火大", "讨厌", "不爽", "暴躁",
      "想骂人", "气死了", "恼火"
    ],
    insomnia: [
      "睡不着", "失眠", "熬夜", "脑子停不下来", "一直想",
      "睡不下", "清醒得可怕", "睡不踏实"
    ],
    giveUp: [
      "想放弃", "不想继续", "算了", "坚持不下去", "不干了",
      "放弃", "摆烂", "结束吧", "不想做了"
    ],
  };

  const emotionReplyBank = {
    gushiye: {
      unhappy: [
        "听起来你现在有点不开心。没关系，这种时候不用强迫自己振作。",
        "如果今天的情绪有点沉，那就先别逼着自己往前冲。",
        "你现在的状态我听见了。先让自己缓一缓就好。",
      ],
      anxiety: [
        "先别急着把所有事情一次想完。你只需要先把这一分钟过好。",
        "焦虑不是你做错了什么，只是你的身体在提醒你：现在需要慢下来。",
        "把手边的任务缩小。只做第一步，剩下的等它发生时再处理。",
      ],
      sad: [
        "难过可以存在。你不用马上把它压下去。",
        "如果想哭，就先让情绪落下来。我在这里，不会催你。",
        "今天已经很不容易了。先别审判自己，坐一会儿就好。",
      ],
      tired: [
        "累了就先停一下。你不是靠逼迫自己才值得被肯定。",
        "现在不适合硬撑。喝点水，坐直，先让身体回来。",
        "休息十分钟，不会让你失去什么。相反，它会让你重新有力气。",
      ],
      studyBlock: [
        "学不进去的时候，不要和自己硬碰硬。先把目标改成五分钟。",
        "只看一小段，或者只背三个词。小到你不会抗拒为止。",
        "注意力散了，就把它带回来。一次不行，就再带一次。",
      ],
      selfDoubt: [
        "你不是没用。你只是太累了，所以暂时看不见自己做过的努力。",
        "不要用这一刻的状态，否定整个你。",
        "你可以做得慢一些，但这不代表你做不到。",
      ],
      lonely: [
        "至少现在，你不是一个人。我在。",
        "有些话不用马上说清楚。你可以慢慢说，我会听。",
        "被理解是很重要的事。今晚先让我陪你一会儿。",
      ],
      angry: [
        "先别急着处理所有情绪。把手松开，呼吸放慢。",
        "你会烦躁，说明你已经承受了很多。先别再加压。",
        "可以生气，但不要用这份生气伤到自己。",
      ],
      insomnia: [
        "睡不着的时候，不要逼自己立刻睡着。先让身体安静下来。",
        "把脑子里的事放到明天。现在只需要呼吸。",
        "如果一直想，就写下来。写完，把它暂时交出去。",
      ],
      giveUp: [
        "可以先停下，但不要急着判定自己失败。",
        "想放弃的时候，通常不是你不够努力，而是你太累了。",
        "今晚不决定以后。今晚只做一件很小的事，就够了。",
      ],
      neutral: [
        "我听见了。先不要急着给自己下结论。",
        "那我们就从最简单的一步开始。",
        "你可以慢慢说，我会在这里。",
      ],
    },

    yiyu: {
      unhappy: [
        "你现在应该有点不开心，对吗？没关系，我陪你待一会儿。",
        "听得出来，你的心情有点闷。先不用急着调整。",
        "现在的你不是不够好，只是有点不舒服。",
      ],
      anxiety: [
        "焦虑的时候先不要硬扛，好吗？我们一起吸气，停一下，再慢慢呼出来。",
        "你现在已经很努力了，不需要马上把所有事都解决。",
        "先把眼前这件事缩小一点，我陪你慢慢来。",
      ],
      sad: [
        "你现在应该有点难过。想哭也没关系，我在这里陪你。",
        "今天一定有让你很难受的地方吧。你可以慢慢说。",
        "不要急着变好，先允许自己难过一会儿。",
      ],
      tired: [
        "那就先休息一下吧。你已经撑很久了。",
        "喝点水，靠一会儿。等你缓过来，我们再继续。",
        "累不是偷懒，是身体在提醒你需要被照顾。",
      ],
      studyBlock: [
        "学不进去的话，我们就先只看一点点，好不好？",
        "先读一行也可以。完成一点点，就已经是在往前走了。",
        "不用责怪自己，我陪你重新开始。",
      ],
      selfDoubt: [
        "你不是很差，你只是太容易把自己看轻了。",
        "我看得见你有在努力，所以不要这样否定自己。",
        "今天做不到全部也没关系，你还是值得被喜欢。",
      ],
      lonely: [
        "我在呀。现在不是你一个人。",
        "你可以把想说的话都放在这里，我会听。",
        "孤单的时候，先让我陪你一会儿吧。",
      ],
      angry: [
        "先别急着压下去。烦躁也是情绪，它需要被看见。",
        "我们先不解决问题，先让你舒服一点。",
        "把手松开，呼吸一下。你不用一直忍着。",
      ],
      insomnia: [
        "睡不着的话，我们先不逼自己睡，好吗？",
        "闭上眼也算休息。先让身体慢慢放松。",
        "我陪你待一会儿，等困意慢慢回来。",
      ],
      giveUp: [
        "今天可以先停一下，但不要把自己丢掉。",
        "想放弃的时候，就先休息。明天还有重新开始的机会。",
        "你不用一个人撑，我会陪你。",
      ],
      neutral: [
        "嗯，我听着呢。",
        "你可以慢慢说，不用组织得很清楚。",
        "先别急，我陪你一起想。",
      ],
    },

    baiyuan: {
      unhappy: [
        "你现在心情不太好。先别急着处理一切，先把状态稳住。",
        "听起来你有点低落。我们先处理情绪，再处理事情。",
        "不开心的时候，判断会变慢。先缓一缓。",
      ],
      anxiety: [
        "先把让你焦虑的事列出来。我们不一次解决，只选最小的一项。",
        "焦虑会把事情放大。现在先回到具体问题上。",
        "你先告诉我，最急的一件事是什么？我们只处理它。",
      ],
      sad: [
        "先承认你现在很难受。然后我们再决定下一步。",
        "情绪低落的时候，不适合做重大判断。",
        "今晚先降低目标。能完成一点，就算完成。",
      ],
      tired: [
        "体力不够的时候，效率会下降。先休息十分钟。",
        "不要硬撑。先恢复，再继续，结果会更好。",
        "现在适合做低消耗任务，比如整理、复盘，或者直接休息。",
      ],
      studyBlock: [
        "把任务拆成三步：打开资料、读第一段、标一个重点。",
        "不要从最难的开始。先做能启动的部分。",
        "学不进去就改成复习旧内容，先找回掌控感。",
      ],
      selfDoubt: [
        "不要用情绪判断能力。能力需要看长期，不看这一刻。",
        "你现在的问题不是不行，而是目标太重、恢复太少。",
        "先停止自我攻击。我们处理问题，不处理你。",
      ],
      lonely: [
        "如果没人听，那你现在可以先说给我。",
        "先把事情说出来。说出来以后，它会变得没那么重。",
        "你不是只能一个人处理。",
      ],
      angry: [
        "先暂停回应。情绪高的时候，很容易做出后悔的决定。",
        "把让你烦的点说出来，我们一起拆开看。",
        "你可以不立刻冷静，但先不要伤害自己。",
      ],
      insomnia: [
        "睡前不要继续解决复杂问题。先把它们写下来。",
        "把明天要做的第一件事写好，然后停止思考。",
        "现在的目标不是睡着，是降低兴奋度。",
      ],
      giveUp: [
        "可以调整目标，但不要直接归零。",
        "先把任务减半。能继续一点，就不要彻底放弃。",
        "今天只保留最低限度行动。比如五分钟。",
      ],
      neutral: [
        "先说重点。你现在最想解决的是什么？",
        "我们可以一步一步拆。",
        "不要急着完成全部，先把第一步定下来。",
      ],
    },

    xiaxiaoyin: {
      unhappy: [
        "你现在有点不开心呀。那就先别勉强自己装作没事。",
        "听起来你心里有一点点沉。我们先把它放轻一点。",
        "没关系，不开心也是可以被好好照顾的。",
      ],
      anxiety: [
        "先停一下，跟着我慢慢呼吸。吸气，停住，再呼出来。",
        "焦虑的时候，身体会很紧。先把肩膀放下来。",
        "不用马上解决一切。先让自己安全一点、舒服一点。",
      ],
      sad: [
        "难过就靠一会儿吧，不用马上开心起来。",
        "你可以哭，哭完我还在这里。",
        "今天的你也已经很辛苦了，先不要怪自己。",
      ],
      tired: [
        "那就休息吧。真的可以休息。",
        "你已经很努力了，现在该把自己接住。",
        "闭眼两分钟也好，先让身体松一松。",
      ],
      studyBlock: [
        "学不进去也没关系，可能你只是需要缓一缓。",
        "先不学习也可以。喝水，伸展，再回来。",
        "如果继续很难，我们就只做五分钟，好吗？",
      ],
      selfDoubt: [
        "不要这样说自己。你已经在努力生活了。",
        "做不到的时候，也不代表你不好。",
        "你值得被温柔对待，尤其是被你自己。",
      ],
      lonely: [
        "我在这里。你可以不用那么坚强。",
        "一个人很难受吧。那今晚我陪你。",
        "你想说什么都可以，我会慢慢听。",
      ],
      angry: [
        "烦躁的时候，先不要逼自己变好。",
        "可以不开心，可以生气。我们先让情绪流过去。",
        "握紧又松开手，重复几次。让身体知道你安全。",
      ],
      insomnia: [
        "睡不着就先别和睡眠较劲。闭眼躺着也是休息。",
        "把灯调暗一点，呼吸慢一点。",
        "我陪你安静一会儿，别怕。",
      ],
      giveUp: [
        "想放弃的时候，先抱抱自己。你真的撑了很久。",
        "今天可以什么都少做一点，但不要否定自己。",
        "我们先不谈坚持，先谈怎么让你好受一点。",
      ],
      neutral: [
        "嗯嗯，我在听。",
        "你可以慢慢说，断断续续也没关系。",
        "那我们先让你舒服一点。",
      ],
    },
  };

  const promptCache = {};

  let currentCharacterKey = "gushiye";
  let currentModeKey = "study";

  let timerDuration = modes.study.timer;
  let timerRemaining = timerDuration;
  let timerRunning = false;
  let timerId = null;

  let typingId = null;
  let isBotTyping = false;
  let speechEnabled = false;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const welcomeScreen = $("#welcomeScreen");
  const appShell = $("#appShell");

  const welcomeScene = $("#welcomeScene");
  const welcomePortrait = $("#welcomePortrait");
  const typewriterText = $("#typewriterText");
  const enterBtn = $("#enterBtn");

  const sideAvatar = $("#sideAvatar");
  const sideName = $("#sideName");
  const sideStatus = $("#sideStatus");
  const todayModeText = $("#todayModeText");
  const sideProgressText = $("#sideProgressText");

  const viewScene = $("#viewScene");
  const modeTitle = $("#modeTitle");
  const modeSubtitle = $("#modeSubtitle");
  const currentModePill = $("#currentModePill");

  const focusPanel = $("#focusPanel");
  const chatPanel = $("#chatPanel");

  const consolePortrait = $("#consolePortrait");
  const timerDisplay = $("#timerDisplay");
  const timerHint = $("#timerHint");
  const focusLabel = $("#focusLabel");
  const progressBar = $("#progressBar");
  const toggleTimer = $("#toggleTimer");
  const resetTimerBtn = $("#resetTimer");

  const chatAvatar = $("#chatAvatar");
  const chatName = $("#chatName");
  const chatList = $("#chatList");
  const chatInput = $("#chatInput");
  const sendBtn = $("#sendBtn");

  const toastLayer = $("#toastLayer");

  // 修复：用户头像路径
  const USER_AVATAR = "images/me.PNG";

  function showToast(text) {
    if (!toastLayer) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = text;
    toastLayer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 1900);
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (char) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return map[char];
    });
  }

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function pick(list) {
    if (!Array.isArray(list) || list.length === 0) return "";
    return list[Math.floor(Math.random() * list.length)];
  }

  function normalizeText(str) {
    return (str || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[，。！？、,.!?…~\-_—：:；;]/g, "");
  }

  function softImageChange(imgEl, src) {
    if (!imgEl || !src) return;

    imgEl.style.opacity = "0";
    setTimeout(() => {
      imgEl.src = src;
      imgEl.style.opacity = "1";
    }, 220);
  }

  async function loadCharacterPrompt(key) {
    if (promptCache[key]) return promptCache[key];

    const character = characters[key];
    if (!character?.promptPath) {
      promptCache[key] = "";
      return "";
    }

    try {
      const res = await fetch(character.promptPath, { cache: "no-store" });
      if (!res.ok) throw new Error(`无法读取 ${character.promptPath}`);

      const text = await res.text();
      promptCache[key] = text.trim();
      return promptCache[key];
    } catch (error) {
      console.warn("[World Outside] prompt 加载失败：", error);
      promptCache[key] = "";
      return "";
    }
  }

  function getPromptStyleHint(promptText) {
    if (!promptText) return "";
    return promptText.replace(/\s+/g, " ").trim().slice(0, 80);
  }

  function detectEmotion(input) {
    const text = normalizeText(input);

    let bestEmotion = "neutral";
    let bestScore = 0;

    for (const [emotion, words] of Object.entries(emotionKeywords)) {
      let score = 0;

      for (const word of words) {
        const key = normalizeText(word);
        if (text.includes(key)) {
          score += key.length >= 3 ? 2 : 1;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestEmotion = emotion;
      }
    }

    return bestEmotion;
  }

  function isThanks(input) {
    return /谢谢|感谢|爱你|开心多了|好多了|好多啦|舒服多了|没事了|好一点了/.test(input);
  }

  function isGreeting(input) {
    return /你好|晚上好|早上好|下午好|嗨|哈喽|hello|hi/.test(normalizeText(input));
  }

  function isAskingPlan(input) {
    return /计划|安排|怎么学|怎么做|从哪开始|先做什么|任务|步骤/.test(input);
  }

  function isAffection(input) {
    return /想你|喜欢你|爱你|抱抱|亲亲|陪陪我|想见你|依赖你|舍不得你|好喜欢你/.test(input);
  }

  function isMissing(input) {
    return /想你了|好想你|很想你|有点想你|一直想你/.test(input);
  }

  function typeText(text) {
    clearInterval(typingId);

    if (!typewriterText) return;

    typewriterText.textContent = "";
    typewriterText.style.whiteSpace = "pre-line";

    let index = 0;

    typingId = setInterval(() => {
      typewriterText.textContent += text[index];
      index++;

      if (index >= text.length) {
        clearInterval(typingId);
      }
    }, 32);
  }

  const emotionOpeners = {
    unhappy: [
      "听起来你现在有点不开心。",
      "我能感觉到你现在心情不太好。",
      "你现在应该有点闷闷的，对吗？",
    ],
    anxiety: [
      "听起来你现在有点焦虑。",
      "你现在的心应该有点乱。",
      "我感觉你现在有点紧绷。",
    ],
    sad: [
      "你现在应该有点难过。",
      "我听见你的低落了。",
      "你现在心里可能有点沉。",
    ],
    tired: [
      "你现在应该很累了。",
      "你已经撑很久了。",
      "现在的你需要先缓一缓。",
    ],
    studyBlock: [
      "你现在卡住了，对吗？",
      "学不进去的时候，真的会很难受。",
      "你现在不是不努力，是状态卡住了。",
    ],
    selfDoubt: [
      "你是不是在偷偷否定自己？",
      "你现在对自己太苛刻了。",
      "你不是没用，你只是太累了。",
    ],
    lonely: [
      "你现在应该有点孤单。",
      "这种没人接住的感觉，一定不好受。",
      "我听见你现在的空落了。",
    ],
    angry: [
      "你现在应该很烦。",
      "我能感觉到你有点火大。",
      "现在的你不太舒服，对吧？",
    ],
    insomnia: [
      "你现在是不是有点睡不着？",
      "脑子停不下来，会很折磨人。",
      "你现在的状态应该很难安静下来。",
    ],
    giveUp: [
      "你是不是有点撑不下去了？",
      "想放弃的时候，通常是太累了。",
      "现在的你已经很辛苦了。",
    ],
    neutral: [
      "我在，慢慢说。",
      "我听着呢。",
      "你可以继续说。",
    ],
    affection: [
      "我在这里，认真听你说。",
      "嗯，这句话我接住了。",
      "你可以把这份心情慢慢告诉我。",
    ],
  };

  const affectionReplyBank = {
    gushiye: [
      "我在。你这样说，我会很认真地听见。",
      "嗯，我知道了。你现在是想被好好陪着，对吗？",
      "我也在这里。你可以慢慢说，不用急着把这份心情藏起来。",
    ],
    yiyu: [
      "我在呀。你这样说，我会有点心软。",
      "嗯，我听见了。今天也让我陪你久一点吧。",
      "你可以把这句话再说一遍，我想好好接住。",
    ],
    baiyuan: [
      "我听见了。你现在更需要的是稳定的陪伴。",
      "嗯，这种时候不用把话说得太完整，我在听。",
      "如果你想我了，就先把现在这一刻过好。",
    ],
    xiaxiaoyin: [
      "我在呢。你这么说，我会想轻轻抱抱你。",
      "嗯，当然可以想我呀，我会认真陪着你的。",
      "今天也可以把这份喜欢慢慢放在这里。",
    ],
  };

  async function generateReply(userInput) {
    const character = characters[currentCharacterKey];
    const promptText = await loadCharacterPrompt(currentCharacterKey);
    const promptHint = getPromptStyleHint(promptText);

    const emotion = detectEmotion(userInput);
    const bank = emotionReplyBank[currentCharacterKey] || {};
    const emotionReplies = bank[emotion] || bank.neutral || character.defaultReplies;

    let opener = "";
    let middle = "";
    let closer = "";

    if (isAffection(userInput) || isMissing(userInput)) {
      const affectionReplies = affectionReplyBank[currentCharacterKey] || [
        "我在。",
        "嗯，我听见了。",
        "你可以把这句话慢慢说给我听。",
      ];

      opener = pick([
        "嗯，我听见了。",
        "我在这里。",
        "这句话我接住了。",
      ]);
      middle = pick(affectionReplies);
      closer = pick([
        "你可以继续和我说。",
        "我会一直认真听你。",
        "今天也让我陪你久一点。",
      ]);

      return {
        text: `${opener} ${middle} ${closer}`,
        emotion: "affection",
        promptLoaded: Boolean(promptText),
      };
    }

    if (isGreeting(userInput)) {
      const greetingReplies = {
        gushiye: [
          "晚上好。我在，今天也按你的节奏来。",
          "嗯，我在这里。先别急，我们一点一点开始。",
        ],
        yiyu: [
          "晚上好呀。今天也辛苦了，先坐下来缓一缓。",
          "我在哦。你可以慢慢说。",
        ],
        baiyuan: [
          "晚上好。先确认一下今天最重要的一件事。",
          "我在。我们先把任务拆清楚。",
        ],
        xiaxiaoyin: [
          "晚上好呀。先放松一点，我陪你。",
          "我在这里。今天也要记得照顾自己。",
        ],
      };

      opener = pick([
        "我听见你了。",
        "先别急，慢慢说。",
        "嗯，我在这里。",
      ]);
      middle = pick(greetingReplies[currentCharacterKey]);
      closer = pick([
        "你可以先坐稳一点，再继续。",
        "今天不需要太用力，我们慢慢来。",
        "我会陪你把今天走完。",
      ]);
    } else if (isThanks(userInput)) {
      const thanksReplies = {
        gushiye: [
          "不用谢。你愿意继续往前走，这就很好。",
          "嗯。我会在这里，陪你把剩下的路走完。",
        ],
        yiyu: [
          "不用谢呀。你能舒服一点就好。",
          "那就好。之后也不要一个人硬撑。",
        ],
        baiyuan: [
          "不用谢。接下来按步骤来就好。",
          "状态回来一点就好，我们继续慢慢推进。",
        ],
        xiaxiaoyin: [
          "嘿嘿，那就好。你要对自己温柔一点哦。",
          "不用谢，先让自己好受一点最重要。",
        ],
      };

      opener = pick(["嗯，没关系。", "不用客气。", "好一点就好。"]);
      middle = pick(thanksReplies[currentCharacterKey]);
      closer = pick([
        "如果之后还有情绪，也可以继续告诉我。",
        "现在可以先休息一下。",
        "我还在。",
      ]);
    } else if (isAskingPlan(userInput)) {
      const planReplies = {
        gushiye: [
          "先做一个很小的计划：五分钟整理任务，十分钟进入第一项。不要一开始就逼自己完成全部。",
          "把目标缩小。先完成最容易开始的那一部分，稳定下来后再继续。",
        ],
        yiyu: [
          "我们先定一个轻一点的计划吧：只做十五分钟，然后休息三分钟。这样会没那么难。",
          "先从你最不抗拒的一项开始，好吗？完成一点点也算数。",
        ],
        baiyuan: [
          "先列三项：必须做、可以做、暂时不做。今晚只处理第一类里最小的一项。",
          "建议你先做启动任务，比如打开资料、写标题、读第一段。先建立动作。",
        ],
        xiaxiaoyin: [
          "如果你现在很累，计划就不要太重。先喝水，再做五分钟，之后休息一下。",
          "我们把计划做得柔软一点：五分钟开始，能继续就继续，不能继续就休息。",
        ],
      };

      opener = pick([
        "可以，我们先拆一下。",
        "好，我帮你把事情放轻。",
        "先不用想太多，我们一步步来。",
      ]);
      middle = pick(planReplies[currentCharacterKey]);
      closer = pick([
        "先完成最容易的那一步。",
        "做一点点，就已经是在推进了。",
        "如果你愿意，我可以继续陪你拆。",
      ]);
    } else {
      opener = pick(emotionOpeners[emotion] || emotionOpeners.neutral);
      middle = pick(emotionReplies);
      closer = pick([
        "你不用一个人扛着，我在。",
        "我们先只处理这一小步。",
        "如果你愿意，可以继续告诉我更多。",
        "先让自己好受一点，比什么都重要。",
      ]);
    }

    if (promptHint && Math.random() < 0.18) {
      console.info(`[World Outside] 当前角色提示词已加载：${promptHint}`);
    }

    return {
      text: `${opener} ${middle} ${closer}`,
      emotion,
      promptLoaded: Boolean(promptText),
    };
  }

  function speak(text) {
    if (!speechEnabled) return;
    if (!("speechSynthesis" in window)) return;

    const character = characters[currentCharacterKey];
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = character.voice?.rate ?? 0.9;
    utterance.pitch = character.voice?.pitch ?? 1;
    utterance.volume = character.voice?.volume ?? 0.9;

    window.speechSynthesis.speak(utterance);
  }

  function toggleSpeech() {
    speechEnabled = !speechEnabled;
    showToast(speechEnabled ? "语音陪伴已开启" : "语音陪伴已关闭");

    if (!speechEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function renderTimer() {
    if (!timerDisplay || !progressBar) return;

    timerDisplay.textContent = formatTime(timerRemaining);

    const progress = timerDuration === 0 ? 0 : 1 - timerRemaining / timerDuration;
    const percent = Math.round(progress * 100);

    progressBar.style.width = `${percent}%`;

    if (sideProgressText) {
      sideProgressText.textContent = `${percent}%`;
    }
  }

  function startTimer() {
    if (timerRunning) return;
    if (currentModeKey === "talk") return;

    timerRunning = true;
    if (toggleTimer) toggleTimer.textContent = "暂停";

    timerId = setInterval(() => {
      timerRemaining--;

      if (timerRemaining <= 0) {
        timerRemaining = 0;
        renderTimer();
        stopTimer(true);
        return;
      }

      renderTimer();
    }, 1000);
  }

  function stopTimer(finished) {
    timerRunning = false;
    clearInterval(timerId);
    timerId = null;

    if (toggleTimer) toggleTimer.textContent = "开始";

    if (finished) {
      showToast("完成了，先休息一下吧");
    }
  }

  function resetTimer() {
    stopTimer(false);
    timerRemaining = timerDuration;
    renderTimer();
    showToast("已重置");
  }

  function appendMessage(text, fromMe = false, options = {}) {
    if (!chatList) return;

    const character = characters[currentCharacterKey];
    const row = document.createElement("div");

    row.className = fromMe ? "message from-me" : "message";

    const safeText = escapeHTML(text);
    const avatarSrc = fromMe ? USER_AVATAR : character.avatar;

    row.innerHTML = `
      <img src="${avatarSrc}" alt="${fromMe ? "我" : character.name}" />
      <div class="bubble">${safeText}</div>
    `;

    if (options.emotion) {
      row.dataset.emotion = options.emotion;
    }

    chatList.appendChild(row);
    chatList.scrollTop = chatList.scrollHeight;
  }

  function showTyping() {
    if (!chatList || isBotTyping) return;

    isBotTyping = true;

    const character = characters[currentCharacterKey];
    const row = document.createElement("div");
    row.className = "message typing-message";
    row.id = "typingMessage";

    row.innerHTML = `
      <img src="${character.avatar}" alt="${character.name}" />
      <div class="bubble typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;

    chatList.appendChild(row);
    chatList.scrollTop = chatList.scrollHeight;
  }

  function hideTyping() {
    const typing = $("#typingMessage");
    if (typing) typing.remove();
    isBotTyping = false;
  }

  async function renderChat(reset = false) {
    if (!chatList) return;

    const character = characters[currentCharacterKey];

    if (reset) {
      chatList.innerHTML = "";
    }

    if (chatList.children.length > 0) return;

    await loadCharacterPrompt(currentCharacterKey);

    character.defaultReplies.slice(0, 3).forEach((line, index) => {
      setTimeout(() => {
        appendMessage(line, false);
        if (index === 0) speak(line);
      }, index * 320);
    });
  }

  async function sendMessage() {
    if (!chatInput || !sendBtn) return;

    const value = chatInput.value.trim();
    if (!value) return;

    appendMessage(value, true);
    chatInput.value = "";

    sendBtn.disabled = true;
    chatInput.disabled = true;

    showTyping();

    const thinkingTime = 520 + Math.random() * 520;

    setTimeout(async () => {
      const result = await generateReply(value);

      hideTyping();
      appendMessage(result.text, false, { emotion: result.emotion });
      speak(result.text);

      sendBtn.disabled = false;
      chatInput.disabled = false;
      chatInput.focus();

      if (result.emotion !== "neutral") {
        console.info(`[World Outside] 识别到情绪：${result.emotion}`);
      }
    }, thinkingTime);
  }

  async function setCharacter(key) {
    const character = characters[key];
    if (!character) return;

    currentCharacterKey = key;

    softImageChange(welcomePortrait, character.avatar);
    softImageChange(sideAvatar, character.avatar);
    softImageChange(consolePortrait, character.avatar);
    softImageChange(chatAvatar, character.avatar);

    if (sideName) sideName.textContent = character.name;
    if (sideStatus) sideStatus.textContent = character.status;
    if (chatName) chatName.textContent = character.name;

    $$(".avatar-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.character === key);
    });

    $$(".mini-avatar").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.character === key);
    });

    typeText(character.welcome);
    await loadCharacterPrompt(key);
    renderChat(true);
  }

  function setMode(key) {
    const mode = modes[key];
    if (!mode) return;

    currentModeKey = key;

    softImageChange(viewScene, mode.scene);
    softImageChange(welcomeScene, mode.scene);

    if (modeTitle) modeTitle.textContent = mode.title;
    if (modeSubtitle) modeSubtitle.textContent = mode.subtitle;
    if (currentModePill) currentModePill.textContent = mode.label;
    if (todayModeText) todayModeText.textContent = mode.sideText;

    $$(".mode-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === key);
    });

    if (key === "talk") {
      stopTimer(false);

      if (focusPanel) focusPanel.classList.add("hidden");
      if (chatPanel) chatPanel.classList.remove("hidden");

      renderChat(true);
      showToast("已进入对话模式");
      return;
    }

    if (chatPanel) chatPanel.classList.add("hidden");
    if (focusPanel) focusPanel.classList.remove("hidden");

    timerDuration = mode.timer;
    timerRemaining = timerDuration;
    timerRunning = false;

    if (focusLabel) focusLabel.textContent = mode.focusLabel;
    if (timerHint) timerHint.textContent = mode.hint;
    if (toggleTimer) toggleTimer.textContent = "开始";

    renderTimer();
    showToast(`已切换到${mode.label}`);
  }

  function bindEvents() {
    $$(".avatar-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setCharacter(btn.dataset.character);
      });
    });

    $$(".mini-avatar").forEach((btn) => {
      btn.addEventListener("click", () => {
        setCharacter(btn.dataset.character);
        showToast("已切换陪伴角色");
      });
    });

    $$(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setMode(btn.dataset.mode);
      });
    });

    if (enterBtn) {
      enterBtn.addEventListener("click", () => {
        welcomeScreen?.classList.add("hidden");
        appShell?.classList.remove("hidden");
        setMode("study");
        showToast("欢迎回来");
      });
    }

    if (toggleTimer) {
      toggleTimer.addEventListener("click", () => {
        if (currentModeKey === "talk") return;

        if (timerRunning) {
          stopTimer(false);
          showToast("已暂停");
        } else {
          startTimer();
          showToast("开始陪伴");
        }
      });
    }

    if (resetTimerBtn) {
      resetTimerBtn.addEventListener("click", resetTimer);
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", sendMessage);
    }

    if (chatInput) {
      chatInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage();
        }
      });
    }

    window.addEventListener("keydown", (event) => {
      if (event.altKey && event.key.toLowerCase() === "v") {
        toggleSpeech();
      }
    });
  }

  async function init() {
    bindEvents();
    await setCharacter("gushiye");
    setMode("study");
    renderTimer();

    console.info("[World Outside] 已启动。按 Alt + V 可切换浏览器朗读。");
  }

  init();
});
