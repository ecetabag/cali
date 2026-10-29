// California TODO — Google Sheets backend.
// 1) Bind this script to your Google Sheet (Extensions > Apps Script).
// 2) Change FAMILY_CODE to a long private passphrase.
// 3) Run setupCaliforniaTodo() once, authorize, then deploy as Web app:
//    Execute as Me; Who has access: Anyone.
// Never commit your real FAMILY_CODE to public GitHub.
const FAMILY_CODE='popolatte';
const KEYS=['id','name','city','category','group','cuisine','lat','lng','image','fallback','status','favorite','day','notes','added_by','updated_by','sort','updated_at'];
const COLORS={dark:'#17303A',teal:'#267265',pale:'#E9F2EE'};
function assertCode_(code){if(FAMILY_CODE.startsWith('REPLACE_')||FAMILY_CODE.length<12)throw Error('Change FAMILY_CODE first');if(String(code)!==FAMILY_CODE)throw Error('Incorrect family code')}
function setupCaliforniaTodo(){if(FAMILY_CODE.startsWith('REPLACE_')||FAMILY_CODE.length<12)throw Error('Choose a private family code (12+ characters)');const ss=SpreadsheetApp.getActiveSpreadsheet();if(!ss)throw Error('Open Extensions > Apps Script inside the Google Sheet');PropertiesService.getScriptProperties().setProperty('SHEET_ID',ss.getId());const p=tab_('Places');p.getRange(1,1,1,18).setValues([KEYS]);p.getRange(1,1,1,18).setBackground(COLORS.dark).setFontColor('white').setFontWeight('bold');p.setFrozenRows(1);p.setTabColor(COLORS.teal);[200,245,145,120,115,180,90,90,190,130,110,65,110,290,125,125,60,170].forEach((n,i)=>p.setColumnWidth(i+1,n));p.getRange(2,12,p.getMaxRows()-1,1).setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());p.getRange(2,13,p.getMaxRows()-1,1).setNumberFormat('@');rebuild_();ss.setActiveSheet(tab_('Itinerary'));return ss.getUrl()}
function ss_(){const id=PropertiesService.getScriptProperties().getProperty('SHEET_ID');if(!id)throw Error('Run setupCaliforniaTodo first');return SpreadsheetApp.openById(id)}
function tab_(n){const ss=ss_();return ss.getSheetByName(n)||ss.insertSheet(n)}
function record_(r){const o={};KEYS.forEach((k,i)=>{const x=r[i];o[k]=k==='favorite'?x===true||x==='true':k==='lat'||k==='lng'?(x===''?null:Number(x)):k==='sort'?Number(x||0):x==null?'':String(x)});return o}
function row_(p){return KEYS.map(k=>{let x=p[k];if(k==='updated_at')return new Date().toISOString();if(k==='favorite')return x===true||x==='true';if(['lat','lng','sort'].includes(k))return x===null||x===''||x===undefined?'':Number(x);x=String(x??'');return /^[=+@-]/.test(x)&&!/^20\d\d-\d\d-\d\d$/.test(x)?"'"+x:x})}
function all_(){const p=tab_('Places');const last=p.getLastRow();return last<2?[]:p.getRange(2,1,last-1,18).getValues().filter(r=>r[0]).map(record_)}
function doGet(e){const cb=String(e.parameter.callback||'');const safe=/^__caliSheetCb\.cb\d+$/.test(cb)?cb:'__caliSheetCb.cb0';try{if(safe!==cb)throw Error('Bad callback');assertCode_(e.parameter.code);return ContentService.createTextOutput(cb+'('+JSON.stringify({ok:true,items:all_(),url:ss_().getUrl()})+');').setMimeType(ContentService.MimeType.JAVASCRIPT)}catch(ex){return ContentService.createTextOutput(safe+'('+JSON.stringify({ok:false,error:String(ex.message||ex)})+');').setMimeType(ContentService.MimeType.JAVASCRIPT)}}
function doPost(e){try{const p=JSON.parse(e.postData.contents);assertCode_(p.code);const lock=LockService.getScriptLock();lock.waitLock(20000);try{if(p.action==='upsert'){upsert_(p.item)}else if(p.action==='import'){import_(p.items)}else throw Error('Invalid action');rebuild_()}finally{lock.releaseLock()}return ContentService.createTextOutput('ok')}catch(ex){return ContentService.createTextOutput('error: '+String(ex.message||ex))}}
function upsert_(p){if(!p?.id||!p?.name)throw Error('Missing place id/name');const sh=tab_('Places'),n=sh.getLastRow();const ids=n>1?sh.getRange(2,1,n-1,1).getValues().flat():[];const pos=ids.indexOf(p.id);sh.getRange(pos<0?Math.max(n+1,2):pos+2,1,1,18).setValues([row_(p)])}
function import_(arr){if(!Array.isArray(arr)||arr.length>600)throw Error('Too many places');const sh=tab_('Places'),n=sh.getLastRow();const seen=new Set(n>1?sh.getRange(2,1,n-1,1).getValues().flat():[]);const fresh=arr.filter(p=>p&&p.id&&p.name&&!seen.has(p.id)&&seen.add(p.id));if(fresh.length)sh.getRange(Math.max(n+1,2),1,fresh.length,18).setValues(fresh.map(row_))}
function maps_(p){const q=p.lat!=null&&p.lng!=null?p.lat+','+p.lng:p.name+' '+p.city;return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q)}
function view_(name,title,subtitle,headers,widths,records){
 const sh=tab_(name),n=headers.length;
 sh.clearContents();sh.clearFormats();sh.getRange(1,1,2,n).breakApart();
 sh.setHiddenGridlines(true);sh.setFrozenRows(5);sh.setTabColor(COLORS.teal);
 sh.getRange(1,1,1,n).merge();sh.getRange(2,1,1,n).merge();
 sh.getRange(1,1).setValue(title);sh.getRange(2,1).setValue(subtitle);
 sh.getRange(1,1,1,n).setBackground(COLORS.dark).setFontColor('white').setFontWeight('bold').setFontSize(19);sh.setRowHeight(1,52);
 sh.getRange(2,1,1,n).setBackground(COLORS.dark).setFontColor('#BED7D0').setFontSize(10);sh.setRowHeight(2,28);
 const all=all_();sh.getRange(3,1).setValue(all.length+' PLACES   ·   '+all.filter(p=>p.favorite).length+' LIKED   ·   '+all.filter(p=>p.status==='visited').length+' VISITED').setFontColor(COLORS.teal).setFontWeight('bold');sh.getRange(3,1,1,n).setBackground(COLORS.pale);sh.setRowHeight(3,32);
 sh.getRange(5,1,1,n).setValues([headers]).setBackground(COLORS.teal).setFontColor('white').setFontWeight('bold');sh.setRowHeight(5,32);
 if(records.length)sh.getRange(6,1,records.length,n).setValues(records);
 widths.forEach((w,i)=>sh.setColumnWidth(i+1,w));sh.getRange(6,1,Math.max(1,records.length),n).setVerticalAlignment('middle');
 return sh;
}
function rebuild_(){
 const ps=all_();
 const rows=[],bands=[];
 for(let n=3;n<=14;n++){
  const d='2026-11-'+('0'+n).slice(-2);
  bands.push(rows.length+6);
  rows.push([d,Utilities.formatDate(new Date(d+'T12:00:00'),Session.getScriptTimeZone(),'EEEE').toUpperCase(),'','','','','','','','','','']);
  const day=ps.filter(p=>p.day===d).sort((a,b)=>a.sort-b.sort);
  if(!day.length)rows.push(['','','','— Flexible day —','','','','','','','','']);
  day.forEach((p,i)=>rows.push([d,'',i+1,p.name,p.city,p.group,p.cuisine||'',p.status,p.favorite?'♥':'',p.notes,maps_(p),p.image]));
 }
 const it=view_('Itinerary','CALIFORNIA TODO  /  THE ITINERARY','3–14 NOVEMBER 2026  ·  SF / BERKELEY / CARMEL / YOSEMITE',['DATE','DAY','STOP','ACTIVITY / RESTAURANT','AREA','TYPE','CUISINE','STATUS','LIKED','NOTES','GOOGLE MAPS','PHOTO URL'],[115,130,70,245,150,118,180,100,75,315,255,200],rows);
 bands.forEach(r=>{it.getRange(r,1,1,12).setBackground(COLORS.pale).setFontWeight('bold');it.setRowHeight(r,29)});
 if(rows.length)it.getRange(6,10,rows.length,1).setWrap(true);
 const food=ps.filter(p=>p.group==='Food'||p.category==='Restaurant').sort((a,b)=>a.city.localeCompare(b.city)||a.name.localeCompare(b.name));
 const f=view_('Food Guide','CALIFORNIA TODO  /  FOOD GUIDE','RESTAURANTS, BRUNCH, BAKERIES & FAVORITES',['RESTAURANT','CITY','CUISINE','NOTES','LIKED','DATE','STATUS','GOOGLE MAPS','PHOTO URL','ID'],[245,165,190,315,70,125,100,255,200,200],food.map(p=>[p.name,p.city,p.cuisine||'',p.notes,p.favorite?'♥':'',p.day,p.status,maps_(p),p.image,p.id]));if(food.length)f.getRange(6,4,food.length,1).setWrap(true);
 const fav=ps.filter(p=>p.favorite);
 view_('Liked','CALIFORNIA TODO  /  LIKED PLACES','HEART ANY PLACE OR RESTAURANT TO SAVE IT HERE',['PLACE / RESTAURANT','AREA','CATEGORY','CUISINE','DAY','STATUS','NOTES','GOOGLE MAPS','ID'],[260,145,115,180,120,100,315,240,200],fav.map(p=>[p.name,p.city,p.group,p.cuisine||'',p.day,p.status,p.notes,maps_(p),p.id]));
}
function onEdit(e){if(e?.range?.getSheet().getName()==='Places'&&e.range.getRow()>1)rebuild_()}
