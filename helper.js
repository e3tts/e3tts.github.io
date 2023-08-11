function createAudioHTML(path) {
  return '<audio controls controlslist="noplaybackrate nodownload" class="px-1"> <source src=' +
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
    var return_func = (cell, req) => (() =>  {
        if (req.readyState === req.DONE) {
          cell.innerHTML = '<font size="-1">' + req.responseText + '</font>';
        };
      });
    for (var j = 0; j < current_files.length; j++) {
      let cell = table_row.cells[col_offset + i];
      let p = base_path + current_files[j];
      if (current_files[j]=="direct_text"){
        cell.innerHTML = direct_text;
        continue
      }
      if (p.endsWith('txt')) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = return_func(cell, req);
        req.open('GET', p);
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
    // 'impaint_00',
    // 'impaint_01',
    'impaint_02',
    'impaint_03',
    'impaint_04',
    'impaint_05',
    // 'impaint_06',
    'impaint_07',
    'impaint_08',
    'impaint_09',
    // 'impaint_10',
    // 'impaint_11',
    // 'impaint_12',
    'impaint_13',
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
    // 'prompt_04',
    'prompt_05',
    'prompt_06',
    'prompt_07',
    'prompt_08',
    // 'prompt_09',
    'prompt_10',
    // 'prompt_11',
    // 'prompt_12',
    'prompt_13',
    // 'prompt_14',
    // 'prompt_15',
    'prompt_16',
    'prompt_17',
    // 'prompt_18',
    'prompt_19',
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

function generateSpeakerTables(tableId, filenames, ext=['.txt','_gt.wav', '_0.wav','_1.wav','_2.wav','_3.wav']) {
  let table = document.getElementById(tableId);
  for (var i = 0; i < filenames.length; i++) {
    generateExampleRow(table.rows[1 + i], filenames[i], ext, 0);
  }
}


generateSamplesTable('samples-table');
generatePromptTable('prompt-table');
generateImpaintTable('impaint-table');
generateSpeakerTables('single-table', ["data/blue_ioo_007_02923"], ext=['_gt.wav', '_0.wav','_1.wav','_2.wav','_3.wav']);
generateSpeakerTables('speaker-table-02', ["data_anim/blue_mean_example_new_2"]);
generateSpeakerTables('speaker-table-04', ["data_anim/blue_mean_example_4"]);
generateSpeakerTables('speaker-table-05', ["data_anim/blue_mean_example_5"]);
