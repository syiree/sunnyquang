# imports - standard imports
import os

# imports - third-party imports
import addict

# imports - module imports
from build.util import pardir, relurljoin

CONFIG                                      = addict.Dict()

CONFIG.environment                          = os.getenv('WEBDEV_ENV', 'development')
CONFIG.exclude                              = [
    'Gemfile',
    'Gemfile.lock',
    'package.json',
    'node_modules',
    'webpack.config.js',
    'requirements',
    'requirements.txt',
    'build',
    'Makefile',
    'LICENSE',
    'README.md',
    'TODO.md'
]
CONFIG.sass.style                           = 'compressed'

# paths
CONFIG.path.root                            = pardir(__file__, 2)
CONFIG.path.assets                          = os.path.join(CONFIG.path.root, 'assets')
CONFIG.path.images                          = os.path.join(CONFIG.path.assets,  'img')

# brand
CONFIG.brand.name                           = 'Sunny Quang'
CONFIG.brand.email                          = 'sunnygetfitnow@gmail.com' # Only for development
CONFIG.brand.phone                          = '+17132568541'
CONFIG.brand.social.skype                   = 'sunnyquang'

# URLs
CONFIG.baseurl                              = '/sunnyquang'
CONFIG.urls.assets                          = relurljoin(CONFIG.baseurl, 'assets')
CONFIG.urls.data                            = relurljoin(CONFIG.urls.assets, 'data')
CONFIG.urls.images                          = relurljoin(CONFIG.urls.assets, 'img')
CONFIG.urls.icons                           = relurljoin(CONFIG.urls.images, 'icons')
CONFIG.gems                                 = [
    'jekyll-seo-tag'
]

CONFIG.lang                                 = 'en'

# colors
CONFIG.color.primary                        = '#222222'

# navbar
CONFIG.data.navbar.links                    = [
    { "title": "Home",       "url": CONFIG.baseurl },
    { "title": "About Me",   "url": relurljoin(CONFIG.baseurl, 'about') },
    { "title": "Boxing",     "url": relurljoin(CONFIG.baseurl, 'boxing') },
    { "title": "Training",   "url": relurljoin(CONFIG.baseurl, 'training') },
    { "title": "Blog",       "url": relurljoin(CONFIG.baseurl, '#') },
    { "title": "Contact",    "url": relurljoin(CONFIG.baseurl, 'contact') }
]

CONFIG.data.about.paragraphs                = [
    'Sunny is an experienced personal trainer and boxing instructor. His approach focuses on teaching functional exercises for anyone interested in improving mobility, sports performance, and weight loss.',
    'Sunny began his personal training as an MMA fighter at the age of 19. He has several MMA fights under his belt and is currently being promoted by Legacy Fighting. In addition to being an accomplished MMA fighter, he has training across a wide spectrum of modalities including weightlifting, kettlebells, and boxing. His passion for training others is motivated by the conviction that we must counteract the inertia that accompanies our modern lifestyle by adopting a holistic mind body approach by utilizing functional exercises to develop mobility, power, and strength.',
    'Sunny holds a degree from the National Personal Training Institute. His personal training certifications include NASM certified, Kettlebell certified, Trigger point certified, and as a Box n Burn boxing instructor. Sunny teaches boxing classes on the weekends. All levels are welcomed.'
]

CONFIG.data.images.certifications           = [
    { "src": relurljoin(CONFIG.urls.images, 'certifications', filename) }
    for filename in os.listdir(os.path.join(CONFIG.path.images, 'certifications'))
]

CONFIG.data.images.carousel                 = [
    { "src": relurljoin(CONFIG.urls.images, 'carousel', filename) }
    for filename in os.listdir(os.path.join(CONFIG.path.images, 'carousel'))
]
