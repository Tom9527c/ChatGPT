use anyhow::Result;
use log::{error, info};
use std::{
  fs::{self, File},
  io::Write,
  path::Path,
};

pub static SCRIPT_MAIN: &[u8] = include_bytes!("../../../scripts/main.js");
pub static SCRIPT_MANIFEST: &[u8] = include_bytes!("../../../scripts/manifest.json");
pub static SCRIPT_README: &[u8] = include_bytes!("../../../scripts/README.md");

#[derive(Debug)]
pub struct Template {
  pub main: Vec<u8>,
  pub manifest: Vec<u8>,
  pub readme: Vec<u8>,
}

impl Template {
  pub fn new<P: AsRef<Path>>(template_dir: P) -> Self {
    let template_dir = template_dir.as_ref();
    let mut template = Template::default();

    {
      let files = vec![
        (template_dir.join("main.js"), &mut template.main),
        (template_dir.join("README.md"), &mut template.readme),
        (template_dir.join("manifest.json"), &mut template.manifest),
      ];

      for (filename, dest) in files {
        if !filename.exists() {
          match create_dir(&filename) {
            Ok(_) => {
              if let Err(e) = write_file_contents(&filename, dest) {
                error!("write_script, {}: {}", filename.display(), e);
              } else {
                info!("write_script: {}", filename.display());
              }
            }
            Err(e) => {
              error!("create_file, {}: {}", filename.display(), e);
            }
          }
        }
      }
    }

    template
  }
}

impl Default for Template {
  fn default() -> Template {
    Template {
      main: Vec::from(SCRIPT_MAIN),
      manifest: Vec::from(SCRIPT_MANIFEST),
      readme: Vec::from(SCRIPT_README),
    }
  }
}

fn create_dir<P: AsRef<Path>>(filename: P) -> Result<()> {
  let filename = filename.as_ref();
  if let Some(parent) = filename.parent() {
    if !parent.exists() {
      fs::create_dir_all(parent)?;
    }
  }
  Ok(())
}

pub fn write_file_contents<P: AsRef<Path>>(filename: P, data: &[u8]) -> Result<()> {
  let filename = filename.as_ref();
  let mut file = File::create(filename)?;
  file.write_all(data)?;
  Ok(())
}
