const gulp = require("gulp");
const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");
const { glob } = require("glob");
const cleanCSS = require("gulp-clean-css");

const sizes = [400, 800, 1200, 1800];

async function images() {
    const inputDir = path.join(__dirname, "src/images");
    const outputDir = path.join(__dirname, "dist/images");

    await fs.ensureDir(outputDir);

    const files = await glob("**/*.{jpg,jpeg,png,svg}", {
        cwd: inputDir,
        nodir: true
    });

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const ext = path.extname(file);
        const name = path.basename(file, ext);

        for (const width of sizes) {
            await sharp(inputPath)
                .resize({ width, withoutEnlargement: true })
                .jpeg({ quality: 80 })
                .toFile(path.join(outputDir, `${name}-${width}.jpg`));

            await sharp(inputPath)
                .resize({ width, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(path.join(outputDir, `${name}-${width}.webp`));

            await sharp(inputPath)
                .resize({ width, withoutEnlargement: true })
                .avif({ quality: 60 })
                .toFile(path.join(outputDir, `${name}-${width}.avif`));
        }

    }
}

function css() {
    return gulp
        .src("src/css/**/*.css")
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest("dist/css"));
}
exports.css = css;
exports.images = images;
exports.default = gulp.parallel(images, css);