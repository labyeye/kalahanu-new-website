const fs = require('fs');
const content = fs.readFileSync('brands.html', 'utf8');

// The pattern to match everything inside .brand-card after .brand-logo
// We can just use a simple regex or string replacement.
// Let's replace:
// </div>
//             <span class="usp-ribbon">
// With:
// </div>
//             <div class="brand-content">
//               <span class="usp-ribbon">
// And replace:
// <i class="fas fa-arrow-right"></i>
//             </a>
//           </div>
// With:
// <i class="fas fa-arrow-right"></i>
//             </a>
//             </div>
//           </div>

let newContent = content;

// add opening div
newContent = newContent.replace(/<\/div>\s*<span class="usp-ribbon">/g, '</div>\n            <div class="brand-content">\n              <span class="usp-ribbon">');

// add closing div
newContent = newContent.replace(/<\/a>\s*<\/div>\s*<!-- ───/g, '</a>\n            </div>\n          </div>\n          <!-- ───');

// for the last one
newContent = newContent.replace(/<\/a>\s*<\/div>\s*<\/div>\s*<!-- \/\.brands-grid/g, '</a>\n            </div>\n          </div>\n        </div>\n        <!-- /.brands-grid');

fs.writeFileSync('brands.html', newContent);
console.log('Formatted brands.html');
