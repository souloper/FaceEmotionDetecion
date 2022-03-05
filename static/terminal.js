//Bhai dont worry so much this below code is for particles in background

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 66,
        "density": {
          "enable": true,
          "value_area": 868.1035095057337
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.6,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
//buruhhh!! Now here comes the logic behind the terminal

//Dudu jus get some basic understamding of js then you will be able to understand the whole logic behind the terminal  
//
$(function() {
    var data = [
      {
        action: 'type',
        strings: ["Accessing restricted files.."],
        output: 'grabbing files..<br><br>',
        postDelay: 1000
      },
    { 
      action: 'ENVtype',
      strings: ['Activating virtual environment!',"./venv/Scripts/activate"],
      output: '<span class="gray">Virtual environment activated</><br>&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'ENVtype',
      strings: ["Now we need to start the SERVER!",'python ./app.py'],
      output: '<span class="gray">Starting backend services...</><br>&nbsp;',
      postDelay: 1000
    },
    
    { 
      action: 'type',
      strings: ['...'],
      output: $('.mimik-run-output').html(),
      postDelay: 2000
    }
    
  ];
    runScripts(data, 0);
  });
  
  function runScripts(data, pos) {
      var prompt = $('.prompt'),
          script = data[pos];
      if(script.clear === true) {
        $('.history').html(''); 
      }
      switch(script.action) {
          case 'type':
            // cleanup for next execution
            prompt.removeData();
            $('.typed-cursor').text('');
            prompt.typed({
              strings: script.strings,
              typeSpeed: 30,
              callback: function() {
                var history = $('.history').html();
                history = history ? [history] : [];
                history.push('$ ' + prompt.text());
                if(script.output) {
                  history.push(script.output);
                  prompt.html('');
                  $('.history').html(history.join('<br>'));
                }
                // scroll to bottom of screen
                $('section.terminal').scrollTop($('section.terminal').height());
                // Run next script
                pos++;
                if(pos < data.length) {
                  setTimeout(function() {
                    runScripts(data, pos);
                  }, script.postDelay || 1000);
                }
              }
            });
            break;

            case 'ENVtype':
            // cleanup for next execution
            prompt.removeData();
            $('.typed-cursor').text('');
            prompt.typed({
              strings: script.strings,
              typeSpeed: 30,
              callback: function() {
                var history = $('.history').html();
                history = history ? [history] : [];
                history.push('(venv)$ ' + prompt.text());
                if(script.output) {
                  history.push(script.output);
                  prompt.html('');
                  $('.history').html(history.join('<br>'));
                }
                // scroll to bottom of screen
                $('section.terminal').scrollTop($('section.terminal').height());
                // Run next script
                pos++;
                if(pos < data.length) {
                  setTimeout(function() {
                    runScripts(data, pos);
                  }, script.postDelay || 1000);
                }
              }
            });
            break;
          case 'view':
  
            break;
      }
  }
  // These are not the error codes you're looking for.", 'Please either report this error to an administrator or return back and forget you were here...