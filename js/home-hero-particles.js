(function () {
  function easeInOutSine(value) {
    return -(Math.cos(Math.PI * value) - 1) / 2;
  }

  function rgbaFromSample(r, g, b, alpha) {
    var boost = Math.min(255, Math.max(r, g, b) + 36);
    return "rgba(" + boost + "," + Math.min(255, g + 24) + "," + Math.min(255, b + 44) + "," + alpha + ")";
  }

  function initHeroParticles() {
    var canvas = document.querySelector(".home_hero_particles");
    var overlay = document.querySelector(".home_hero_overlay");
    var hero = document.querySelector(".home_hero");

    if (!canvas || !overlay || !hero) {
      return;
    }

    var imageSrc = canvas.getAttribute("data-image");
    if (!imageSrc) {
      overlay.classList.add("is-fallback");
      return;
    }

    var context = canvas.getContext("2d");
    if (!context) {
      overlay.classList.add("is-fallback");
      return;
    }

    var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var pointer = { x: null, y: null, active: false };
    var particles = [];
    var animationId = null;
    var image = new Image();
    var ready = false;
    var sampleGap = window.innerWidth < 700 ? 10 : 8;

    function resizeCanvas() {
      var ratio = window.devicePixelRatio || 1;
      var bounds = hero.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(bounds.width * ratio));
      canvas.height = Math.max(1, Math.floor(bounds.height * ratio));
      canvas.style.width = bounds.width + "px";
      canvas.style.height = bounds.height + "px";
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      sampleGap = bounds.width < 700 ? 10 : 8;
      if (image.complete) {
        buildParticles();
      }
    }

    function buildParticles() {
      var width = canvas.clientWidth;
      var height = canvas.clientHeight;
      if (!width || !height) {
        return;
      }

      var offscreen = document.createElement("canvas");
      var offscreenContext = offscreen.getContext("2d");
      var drawWidth = Math.min(width * 0.9, image.width);
      var scale = drawWidth / image.width;
      var drawHeight = image.height * scale;
      var offsetX = (width - drawWidth) / 2;
      var offsetY = (height - drawHeight) / 2;

      offscreen.width = width;
      offscreen.height = height;
      offscreenContext.clearRect(0, 0, width, height);
      offscreenContext.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

      var data = offscreenContext.getImageData(0, 0, width, height).data;
      particles = [];

      for (var y = 0; y < height; y += sampleGap) {
        for (var x = 0; x < width; x += sampleGap) {
          var index = (y * width + x) * 4;
          var alpha = data[index + 3];
          var r = data[index];
          var g = data[index + 1];
          var b = data[index + 2];
          var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

          if (alpha < 20 || luminance < 42) {
            continue;
          }

          var angle = Math.random() * Math.PI * 2;
          var radius = 22 + Math.random() * (width < 700 ? 56 : 96);

          particles.push({
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            driftX: Math.cos(angle) * radius,
            driftY: Math.sin(angle) * radius,
            size: width < 700 ? 1.15 + Math.random() * 1.1 : 1.3 + Math.random() * 1.5,
            color: rgbaFromSample(r, g, b, 0.16 + luminance / 680),
            phase: Math.random() * Math.PI * 2,
            speed: 0.028 + Math.random() * 0.022
          });
        }
      }

      ready = particles.length > 0;
      if (!ready) {
        overlay.classList.add("is-fallback");
      } else {
        overlay.classList.remove("is-fallback");
      }
    }

    function renderFrame(time) {
      var width = canvas.clientWidth;
      var height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      if (!ready) {
        return;
      }

      var reducedMotion = mediaQuery.matches;

      for (var i = 0; i < particles.length; i += 1) {
        var particle = particles[i];
        var wave = reducedMotion ? 0 : easeInOutSine((Math.sin(time * 0.00032 + particle.phase) + 1) / 2);
        var targetX = particle.baseX + particle.driftX * wave;
        var targetY = particle.baseY + particle.driftY * wave;

        if (!reducedMotion) {
          targetX += Math.cos(time * 0.00055 + particle.phase) * 6;
          targetY += Math.sin(time * 0.00048 + particle.phase * 1.3) * 8;
        }

        if (pointer.active) {
          var dx = particle.x - pointer.x;
          var dy = particle.y - pointer.y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 110) {
            var force = (1 - distance / 110) * 16;
            targetX += (dx / Math.max(distance, 0.001)) * force;
            targetY += (dy / Math.max(distance, 0.001)) * force;
          }
        }

        particle.x += (targetX - particle.x) * particle.speed;
        particle.y += (targetY - particle.y) * particle.speed;

        context.beginPath();
        context.fillStyle = particle.color;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      if (!reducedMotion) {
        animationId = window.requestAnimationFrame(renderFrame);
      }
    }

    hero.addEventListener("pointermove", function (event) {
      var bounds = hero.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    });

    hero.addEventListener("pointerleave", function () {
      pointer.active = false;
      pointer.x = null;
      pointer.y = null;
    });

    window.addEventListener("resize", resizeCanvas);

    image.addEventListener("load", function () {
      resizeCanvas();
      if (mediaQuery.matches) {
        renderFrame(0);
      } else {
        if (animationId) {
          window.cancelAnimationFrame(animationId);
        }
        animationId = window.requestAnimationFrame(renderFrame);
      }
    });

    image.addEventListener("error", function () {
      overlay.classList.add("is-fallback");
    });

    image.src = imageSrc;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroParticles);
  } else {
    initHeroParticles();
  }
})();
