var majordomo = require('majordomo');
var path = require('path');

module.exports = function (config) {
    function convertArray(array) {
        return array.length ? '"' + array.join('", "') + '"' : '';
    }
    
    majordomo.setDebugMode();
    
    majordomo('init', config)
        .ask('checkbox', 'modules', 'What modules do you want?', ['os', 'git', 'npm', 'bower'])
        .branch(function () {
            var modules = this.get('modules');
            return modules.indexOf('npm') !== -1 || modules.indexOf('bower') !== -1;
        }, function () {
            this.ask('input', 'project', 'What is the name of your project?', path.basename(process.cwd()))
                .ask('input', 'name', 'What is your full name?')
                .ask('input', 'email', 'What is your email address?')
                .ask('input', 'description', 'Tell something about this project')
                .ask('input', 'keywords', 'Think about some keywords (separated by space)')
                .ask('input', 'license', 'What license you want?', 'MIT')
                .ask('input', 'main', 'What file will be main of your project?');
        })
        .branch('modules:git', function () {
            this.ask('confirm', 'github', 'Do you use GitHub?')
                .branch('github', function () {
                    this.ask('input', 'github_username', 'What is your GitHub username?');
                });
        })
        .run(function () {
            var data = this.get();
            var modules = data.modules;
            data.modules = convertArray(modules);
            
            if (data.keywords) {
                data.keywords = data.keywords.split(' ');
                data.keywords = convertArray(data.keywords);
            }
            
            if (modules.indexOf('git') !== -1) {
                majordomo.exec('git init');
                majordomo.dest.write('.gitignore', 'node_modules/');
                
                if (data.github) {
                    data.repo = true;
                    data.repo_type = 'git';
                    data.repo_url = 'https://github.com/' + data.github_username + '/' + data.project;
                    data.bugs = data.repo_url + '/issues';
                    
                    majordomo.exec('git remote add origin ' + data.repo_url);
                }
            }
            
            if (modules.indexOf('npm') !== -1) {
                majordomo.dest.write('package.json', majordomo.template(majordomo.src.read('templates/package.json'), data));
            }
            
            if (modules.indexOf('bower') !== -1) {
                majordomo.dest.write('bower.json', majordomo.template(majordomo.src.read('templates/bower.json'), data));
            }
            
            majordomo.dest.write('.majorfile', majordomo.template(majordomo.src.read('templates/.majorfile'), data));
        });
};