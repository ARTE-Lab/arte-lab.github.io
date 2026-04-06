(function () {
  function easeInOutSine(value) {
    return -(Math.cos(Math.PI * value) - 1) / 2;
  }

  function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
  }

  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function brightenColor(r, g, b) {
    return {
      r: Math.min(255, Math.max(r, g, b) + 36),
      g: Math.min(255, g + 24),
      b: Math.min(255, b + 44)
    };
  }

  function rgbaString(color, alpha, shade) {
    var factor = typeof shade === "number" ? shade : 1;
    var rr = Math.round(clamp(color.r * factor, 0, 255));
    var gg = Math.round(clamp(color.g * factor, 0, 255));
    var bb = Math.round(clamp(color.b * factor, 0, 255));
    return "rgba(" + rr + "," + gg + "," + bb + "," + clamp(alpha, 0.05, 0.95).toFixed(3) + ")";
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
    var animationStart = null;
    var timeline = {
      scatter: 1800,
      orbit: 2600,
      gather: 1800,
      hold: 1200
    };
    var cycleDuration = timeline.scatter + timeline.orbit + timeline.gather + timeline.hold;

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

          var centerX = width / 2;
          var centerY = height / 2;
          var baseDx = x - centerX;
          var baseDy = y - centerY;
          var angle = Math.atan2(baseDy, baseDx) + (Math.random() - 0.5) * 0.4;
          var radius = (width < 700 ? 42 : 74) + Math.random() * (width < 700 ? 52 : 110);

          particles.push({
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            orbitBaseX: x + Math.cos(angle) * radius,
            orbitBaseY: y + Math.sin(angle) * radius,
            roamX: (Math.random() - 0.5) * (width < 700 ? 58 : 98),
            roamY: (Math.random() - 0.5) * (width < 700 ? 42 : 76),
            size: width < 700 ? 1.15 + Math.random() * 1.1 : 1.3 + Math.random() * 1.5,
            color: brightenColor(r, g, b),
            baseAlpha: 0.18 + luminance / 680,
            phase: Math.random() * Math.PI * 2,
            turnOffset: Math.random() * 0.65,
            spinDirection: Math.random() > 0.5 ? 1 : -1,
            roamFrequencyX: 0.8 + Math.random() * 1.6,
            roamFrequencyY: 0.8 + Math.random() * 1.6,
            orbitFollowSpeed: 0.08 + Math.random() * 0.05,
            speed: 0.038 + Math.random() * 0.024,
            orbitLift: (Math.random() - 0.5) * (width < 700 ? 18 : 28)
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

    function getAnimationState(elapsedTime, particle, width, height) {
      var elapsed = elapsedTime % cycleDuration;
      var centerX = width / 2;
      var centerY = height / 2;
      var scatterX = particle.orbitBaseX;
      var scatterY = particle.orbitBaseY;

      if (elapsed < timeline.scatter) {
        var scatterProgress = easeOutCubic(elapsed / timeline.scatter);
        return {
          stage: "scatter",
          x: lerp(particle.baseX, scatterX, scatterProgress),
          y: lerp(particle.baseY, scatterY, scatterProgress)
        };
      }

      elapsed -= timeline.scatter;

      if (elapsed < timeline.orbit) {
        var orbitProgress = elapsed / timeline.orbit;
        var localProgress = clamp((orbitProgress - particle.turnOffset * 0.35) / (1 - particle.turnOffset * 0.35), 0, 1);
        var easedProgress = easeInOutSine(localProgress);
        var startDx = scatterX - centerX;
        var startDy = scatterY - centerY;
        var globalAngle = easeInOutSine(orbitProgress) * Math.PI;
        var localAngle = easedProgress * (Math.PI * 0.85) * particle.spinDirection;
        var foldAngle = globalAngle * 0.55 + localAngle * 0.45;
        var cosFold = Math.cos(foldAngle);
        var sinFold = Math.sin(foldAngle);
        var settle = 1 - easedProgress;
        var roamX =
          particle.roamX *
          settle *
          Math.cos(orbitProgress * Math.PI * 2 * particle.roamFrequencyX + particle.phase);
        var roamY =
          particle.roamY *
          settle *
          Math.sin(orbitProgress * Math.PI * 2 * particle.roamFrequencyY + particle.phase * 0.7);
        var zDepth = startDx * sinFold;
        var perspectiveDistance = width * 0.9;
        var perspectiveScale = perspectiveDistance / (perspectiveDistance - zDepth);
        var edgeNarrow = 0.45 + Math.abs(cosFold) * 0.55;
        var verticalWave = Math.sin(orbitProgress * Math.PI * 2 + particle.phase) * particle.orbitLift * settle;
        var shade = 0.55 + ((zDepth / (width * 0.28)) + 1) * 0.22;
        var alphaBoost = 0.62 + perspectiveScale * 0.34;
        var orbitTargetX = centerX + startDx * cosFold * edgeNarrow;
        var orbitTargetY = centerY + startDy * perspectiveScale + verticalWave;

        return {
          stage: "orbit",
          x: orbitTargetX + roamX,
          y: orbitTargetY + roamY,
          scale: 0.82 + perspectiveScale * 0.35,
          alpha: particle.baseAlpha * alphaBoost,
          shade: shade
        };
      }

      elapsed -= timeline.orbit;

      if (elapsed < timeline.gather) {
        var gatherProgress = easeInOutSine(elapsed / timeline.gather);
        return {
          stage: "gather",
          x: lerp(scatterX, particle.baseX, gatherProgress),
          y: lerp(scatterY, particle.baseY, gatherProgress)
        };
      }

      return {
        stage: "hold",
        x: particle.baseX,
        y: particle.baseY,
        scale: 1,
        alpha: particle.baseAlpha,
        shade: 1
      };
    }

    function renderFrame(time) {
      var width = canvas.clientWidth;
      var height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      if (!ready) {
        return;
      }

      var reducedMotion = mediaQuery.matches;
      if (animationStart === null) {
        animationStart = time;
      }
      var elapsedTime = time - animationStart;

      for (var i = 0; i < particles.length; i += 1) {
        var particle = particles[i];
        var motion = reducedMotion
          ? { stage: "hold", x: particle.baseX, y: particle.baseY, scale: 1, alpha: particle.baseAlpha, shade: 1 }
          : getAnimationState(elapsedTime, particle, width, height);
        var targetX = motion.x;
        var targetY = motion.y;

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

        var followSpeed = particle.speed;
        if (motion.stage === "orbit") {
          followSpeed = particle.orbitFollowSpeed;
        } else if (motion.stage === "gather") {
          followSpeed = 0.12;
        } else if (motion.stage === "scatter") {
          followSpeed = 0.1;
        }

        particle.x += (targetX - particle.x) * followSpeed;
        particle.y += (targetY - particle.y) * followSpeed;

        var drawScale = motion.scale || 1;
        var drawAlpha = typeof motion.alpha === "number" ? motion.alpha : particle.baseAlpha;
        var drawShade = typeof motion.shade === "number" ? motion.shade : 1;
        var size = particle.size * drawScale;
        var color = rgbaString(particle.color, drawAlpha, drawShade);

        context.beginPath();
        context.fillStyle = color;
        context.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        context.fill();
      }

      animationId = window.requestAnimationFrame(renderFrame);
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
      animationStart = null;
      if (animationId) {
        window.cancelAnimationFrame(animationId);
      }
      animationId = window.requestAnimationFrame(renderFrame);
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
