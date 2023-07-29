function createAudioHTML(path) {
  return '<audio controls controlslist="nodownload" class="px-1"> <source src=' +
      path +
      ' type="audio/wav">Your browser does not support the audio element.</audio>';
}

function generateExampleRow(table_row, base_path, filename_ext, col_offset, direct_text="") {
  for (var i = 0; i < filename_ext.length; i++) {
    if (Array.isArray(filename_ext[i])) {
      current_files = filename_ext[i];
    } else {
      current_files = [filename_ext[i]];
    }
    for (var j = 0; j < current_files.length; j++) {
      let cell = table_row.cells[col_offset + i];
      let p = base_path + current_files[j];
      if (current_files[j]=="direct_text"){
        cell.innerHTML = direct_text;
        continue
      }
      // if  (p.endsWith('html')) {
      //   var req = new XMLHttpRequest();
      //   req.onreadystatechange = () => {
      //     if (this.readyState === this.DONE) {
      //       cell.innerHTML = req.responseText;
      //     }
      //   };
      //   req.open('GET', p, false);
      //   req.send(null);
      //   // cell.innerHTML =  '<script src="'+p+'"></script>'
      //   // continue
      // }
      if (p.endsWith('txt')) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = () => {
          if (this.readyState === this.DONE) {
            cell.innerHTML = '<font size="-1">' + req.responseText + '</font>';
          }
        };
        req.open('GET', p, false);
        req.send(null);
      } else {
        cell.innerHTML = cell.innerHTML + createAudioHTML(p);
      }
    }
  }
}


function generateImpaintTable(tableId) {
  let table = document.getElementById(tableId);
  let ext = ['.txt', '_gt.wav', '_fast.wav', '_medium.wav', '_slow.wav'];
  let filenames = [
    'impaint_00',
    'impaint_01',
    'impaint_02',
    'impaint_03',
    'impaint_04',
    // 'impaint_05',
    // 'impaint_06',
    // 'impaint_07',
    // 'impaint_08',
    // 'impaint_09',
    // 'impaint_10',
    // 'impaint_11',
    // 'impaint_12',
    // 'impaint_13',
    // 'impaint_14',
    // 'impaint_15',
  ];
  for (var i = 0; i < filenames.length; i++) {
    generateExampleRow(table.rows[1 + i], 'data/' + filenames[i], ext, 0);
  }
}

function generatePromptTable(tableId) {
  let table = document.getElementById(tableId);
  let ext = ['_cond.txt', '_cond.wav', '.txt', '_gt.wav', '.wav'];
  let filenames = [
    'prompt_00',
    'prompt_01',
    'prompt_02',
    'prompt_03',
    'prompt_04',
    // 'prompt_05',
    // 'prompt_06',
    // 'prompt_07',
    // 'prompt_08',
    // 'prompt_09',
    // 'prompt_10',
    // 'prompt_11',
    // 'prompt_12',
    // 'prompt_13',
    // 'prompt_14',
    // 'prompt_15',
    // 'prompt_16',
    // 'prompt_17',
    // 'prompt_18',
    // 'prompt_19',
  ];
  for (var i = 0; i < filenames.length; i++) {
    generateExampleRow(table.rows[1 + i], 'data/' + filenames[i], ext, 0);
  }
}

function generateSamplesTable(tableId) {
  let table = document.getElementById(tableId);
  let ext = ['direct_text', '_gt.wav', '.wav'];
  let direct_texts = [
    'Speaker 1',
    'Speaker 1',
    'Speaker 1',
    'Speaker 2',
    'Speaker 2',
    'Speaker 2',
    'Speaker 3',
    'Speaker 3',
    'Speaker 3',
  ];
  let filenames = [
    'speaker_0_0',
    'speaker_0_1',
    'speaker_0_2',
    'speaker_3_0',
    'speaker_3_1',
    'speaker_3_2',
    'speaker_2_0',
    'speaker_2_1',
    'speaker_2_2',
  ]
  for (var i = 0; i < filenames.length; i++) {
    generateExampleRow(table.rows[1 + i], 'data/' + filenames[i], ext, 0, direct_text=direct_texts[i]);
  }
}

function generateWavOnlyTables(tableId) {
  let table = document.getElementById(tableId);
  let ext = [['_0.wav', '_1.wav','_2.wav','_3.wav','_4.wav']];
  let filenames = [
    'ioo_007_02923'
  ];
  for (var i = 0; i < filenames.length; i++) {
    generateExampleRow(table.rows[1 + i], 'data/' + filenames[i], ext, 1);
  }
}

function generateSpeakerTables(tableId) {
  let table = document.getElementById(tableId);
  let ext = ['.txt','_gt.wav', '_0.wav','_1.wav','_2.wav','_3.wav'];
  let filenames = [
    'example_4',
  ];
  for (var i = 0; i < filenames.length; i++) {
    generateExampleRow(table.rows[1 + i], 'data/' + filenames[i], ext, 0);
  }
}


generateSamplesTable('samples-table');
generatePromptTable('prompt-table');
generateImpaintTable('impaint-table');
generateWavOnlyTables('single-table');
generateSpeakerTables('speaker-table');

// cc = document.getElementById('example_0');
// console.log(cc)
// var req = new XMLHttpRequest();
// req.onreadystatechange = () => {
//   if (this.readyState === this.DONE) {
//     cc.innerHTML = req.responseText;
//   }
// };
// req.open('GET', 'data/second_example_2.html');
// req.send(null);

