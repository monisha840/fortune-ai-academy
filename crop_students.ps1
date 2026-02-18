Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\monis\.gemini\antigravity\brain\74062617-b34e-4ce2-b681-cc16b6527d03\media__1771417194663.png'
$outDir = 'C:\Users\monis\OneDrive\Documents\Fortune_innovatives\fortune-ai-academy\public\students'

$img = [System.Drawing.Image]::FromFile($src)
Write-Host "Tamizharasan image size: $($img.Width) x $($img.Height)"

$size = 210
$bmp = [System.Drawing.Bitmap]::new($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($img, 0, 0, $size, $size)
$g.Dispose()

$outPath = Join-Path $outDir "student12.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
Write-Host "Saved: student12.png"
