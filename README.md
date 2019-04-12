# Climber Cards
<a href="http://www.climberextensions.com/" class="image_link"  target="_blank"><img src="./screenshots/downloadbutton.png?raw=true" 
alt="Download latest release" width="400" height="40" border="0" /></a>

## Most recent update 1.5.0 - 2019-02-21
### Fixed
- Wait for images to load when printing
- Perfect scrollbar sometimes renders on the left side
- Cloak values with ng-bind instead of {{}}

Full CHANGELOG can be found end of this file.

> Table extension with cards as cells, developed for showcasing items with images. Responsive design and selection enabled, both click and swipes. Multiple layout options and Select and Go To Sheet mode

***Tested from Qlik Sense June 2017 (in the initial release of June 2017, extensions load slow. It's fixed in patch 1 )***

<div style="page-break-after: always;"></div> 

## Screenshots
Portrait 
<img src="./screenshots/layout_modes_portrait.png?raw=true" class="image_link" alt="Portrait" />
Landscape
<img src="./screenshots/layout_modes_landscape.png?raw=true" class="image_link" alt="Landscape" />  

## Installation

1. Download the latest version
2. Qlik Sense Desktop
	* To install, copy all files in the .zip file to folder "C:\Users\[%Username%]\Documents\Qlik\Sense\Extensions\Cards"
3. Qlik Sense Server
	* See instructions <a href="http://help.qlik.com/en-US/sense/Subsystems/ManagementConsole/Content/import-extensions.htm"> how to import an extension on Qlik Sense Server </a>


<div style="page-break-after: always;"></div> 

## Configuration
<img src="./screenshots/propertypanel_dimensions.png?raw=true" class="image_link" alt="Dimensions" />
* 1st dimension is the unique identifier that will be selected if a card is selected. The identifier won't show up on the card. 
* 2nd dimension is the image and needs a url for source. 
  * Example url string: 'http://ia.media-imdb.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMDA5Mzg3OA@@._V1_UX34_CR0,0,34,50_AL_.jpg'
  * Example reference an image from Qlik Sense default repository: '../content/Default/Qlik_default_flower.png'
* 3rd dimension is the title of the card. 
* 4th dimension is optional and will show up under the title.  

<div style="page-break-after: always;"></div>

# Selection modes
It is possible to use selections to go to another sheet. 
When "Select and goto sheet" is enabled, swipe selections are disabled. (I.e. it is only possible to select one row in the table.) If one value is already selected it will be deselected and no goto sheet action taken.  
<img src="./screenshots/propertypanel_selectionmode.png?raw=true" class="image_link"  alt="Selection mode - Selections" />  
<img src="./screenshots/propertypanel_selectionmode_gotosheet.png?raw=true" class="image_link"  alt="Selection mode - Select and goto sheet" />  


<div style="page-break-after: always;"></div>

# Layout modes  
See large screenshots above for examples on how the different options display.  
<img src="./screenshots/propertypanel_layoutmode.png?raw=true" class="image_link" alt="Layout modes" />  

Layout mode options
* Small
* Medium
* Large
  
Image mode options
* Portrait
* Landscape
* Square

Image Size mode options
* Contain - Scale to the largest size such that both its width and its height can fit inside the content area
* Cover - Scale to be as large as possible so that the background area is completely covered by the background image. Some parts of the background image may not be in view within the background positioning area.
* Fill - Scale to fill the space. This may significantly distort the image.

Sample app can be found here under the project folders \sample app\Climber Cards.qvf.  

## Known Issues and Limitations

The extension is intended for top lists and dashboard. Because of that we have not included support for very large tables. The limit is currently 10' cells.

## Recommended Versions
Qlik Sense Version | Recommended
------------- | -------------
February 2019|*1.5.0*
November 2018|*1.5.0*
September 2018|*1.5.0*
June 2018|*1.5.0*
April 2018|*1.5.0*
February 2018|*1.5.0*


<div style="page-break-after: always;"></div>   

## Climber Extensions
Like this extension? Check out the other Climber extensions below.

**Container**
* https://github.com/ClimberAB/ClimberContainer

**Selection Bar**
* https://github.com/ClimberAB/ClimberSelectionBar
* https://www.youtube.com/watch?v=4fxrphADRKw

**KPI**
* https://github.com/ClimberAB/ClimberKPI
* https://www.youtube.com/watch?v=9zdfYshNel4

**Cards**
* https://github.com/ClimberAB/ClimberCards
* https://www.youtube.com/watch?v=k_IEt8TvB_c


<div style="page-break-after: always;"></div>   

## Change Log
## 1.5.0 - 2019-02-21 
### Fixed
- Wait for images to load when printing
- Perfect scrollbar sometimes renders on the left side
- Cloak values with ng-bind instead of {{}} 
 
## 1.4.0 - 2018-12-03 
### Added
- Support for November 2018
- Bundle information 
 
## 1.3.1 - 2018-09-10 
### Fixed
- Modules load order (Issue 7 - Visualization not found on the server) 
 
## 1.3.0 - 2018-06-20 
### Added
- Update for Qlik Sense June 2018 
 
## 1.2.2 - 2018-03-11 
### Added
- New logo
- PR Brackets in img URL 
 
## 1.2.1 - 2018-02-14 
### Fixed
- Fix $q 
 
## 1.2.0 - 2018-02-14 
### Added
- Update for Qlik Sense February 2018 
 
## 1.5.0 - 2019-02-21 
### Fixed
- Wait for images to load when printing
- Perfect scrollbar sometimes renders on the left side
- Cloak values with ng-bind instead of {{}} 
 
## 1.4.0 - 2018-12-03 
### Added
- Support for November 2018
- Bundle information 
 
## 1.3.1 - 2018-09-10 
### Fixed
- Modules load order (Issue 7 - Visualization not found on the server) 
 
## 1.3.0 - 2018-06-20 
### Added
- Update for Qlik Sense June 2018 
 
## 1.2.2 - 2018-03-11 
### Added
- New logo
- PR Brackets in img URL 
 
## 1.2.1 - 2018-02-14 
### Fixed
- Fix $q 
 
## 1.2.0 - 2018-02-14 
### Added
- Update for Qlik Sense February 2018 
 


## License

See <a href="License.pdf"> LICENSE </a>


